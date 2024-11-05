import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistrationBox from './RegistrationBox';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('RegistrationBox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('рендерить форму реєстрації з початковими полями', () => {
    render(
      <BrowserRouter>
        <RegistrationBox />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Логін/i)).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/Пароль/i)[0]).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/Пароль/i)[1]).toBeInTheDocument();
    expect(screen.getByText(/Створити/i)).toBeInTheDocument();
  });

  test('відображає помилку, якщо паролі не співпадають', () => {
    render(
      <BrowserRouter>
        <RegistrationBox />
      </BrowserRouter>
    );

    fireEvent.change(screen.getAllByPlaceholderText(/Пароль/i)[0], { target: { value: 'password1' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Пароль/i)[1], { target: { value: 'password2' } });
    fireEvent.click(screen.getByText(/Створити/i));

    expect(screen.getByText('Паролі не співпадають')).toBeInTheDocument();
  });

  test('відправляє запит реєстрації при правильному введенні паролів', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Реєстрація успішна' }),
      })
    );

    render(
      <BrowserRouter>
        <RegistrationBox />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Логін/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Пароль/i)[0], { target: { value: 'password' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Пароль/i)[1], { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/Створити/i));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8082/register',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'password' }),
      })
    ));
    
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });

  test('відображає помилку, якщо сервер повертає помилку', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Помилка реєстрації' }),
      })
    );

    render(
      <BrowserRouter>
        <RegistrationBox />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Логін/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Пароль/i)[0], { target: { value: 'password' } });
    fireEvent.change(screen.getAllByPlaceholderText(/Пароль/i)[1], { target: { value: 'password' } });
    fireEvent.click(screen.getByText(/Створити/i));

    await waitFor(() => expect(screen.getByText('Помилка реєстрації')).toBeInTheDocument());
  });
});
