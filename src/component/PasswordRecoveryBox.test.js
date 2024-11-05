import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PasswordRecoveryBox from './PasswordRecoveryBox';
import '@testing-library/jest-dom';

beforeAll(() => {
  global.alert = jest.fn();
});

describe('PasswordRecoveryBox', () => {
  beforeEach(() => {
    render(
      <Router>
        <PasswordRecoveryBox />
      </Router>
    );
  });

  test('відображає форму відновлення паролю', () => {
    expect(screen.getByPlaceholderText(/логін/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/новий пароль/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/повторіть пароль/i)).toBeInTheDocument();
    expect(screen.getByText(/змінити пароль/i)).toBeInTheDocument();
  });

  test('показує повідомлення про помилку, якщо паролі не співпадають', () => {
    fireEvent.change(screen.getByPlaceholderText(/логін/i), { target: { value: 'user123' } });
    fireEvent.change(screen.getByPlaceholderText(/новий пароль/i), { target: { value: 'password1' } });
    fireEvent.change(screen.getByPlaceholderText(/повторіть пароль/i), { target: { value: 'password2' } });
    
    fireEvent.click(screen.getByText(/змінити пароль/i));

    expect(screen.getByText(/паролі не співпадають/i)).toBeInTheDocument();
  });

  test('відправляє форму з правильними даними', async () => {
    const mockResponse = { message: 'Пароль успішно змінено' };
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    });

    fireEvent.change(screen.getByPlaceholderText(/логін/i), { target: { value: 'user123' } });
    fireEvent.change(screen.getByPlaceholderText(/новий пароль/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/повторіть пароль/i), { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(screen.getByText(/змінити пароль/i));
    });

    expect(global.alert).toHaveBeenCalledWith(mockResponse.message);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8082/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'user123', newPassword: 'password123' })
    });
  });

  test('показує повідомлення про помилку, якщо запит не вдався', async () => {
    const mockResponse = { message: 'Невірний логін' };
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce(mockResponse)
    });

    fireEvent.change(screen.getByPlaceholderText(/логін/i), { target: { value: 'user123' } });
    fireEvent.change(screen.getByPlaceholderText(/новий пароль/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/повторіть пароль/i), { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(screen.getByText(/змінити пароль/i));
    });

    expect(await screen.findByText(/невірний логін/i)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
