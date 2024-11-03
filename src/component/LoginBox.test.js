import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginBox from './LoginBox';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const MockLoginBox = () => (
  <BrowserRouter>
    <LoginBox />
  </BrowserRouter>
);

describe('Компонент LoginBox', () => {
  let navigate;

  beforeAll(() => {
    global.alert = jest.fn(); 
  });

  beforeEach(() => {
    navigate = jest.fn(); 
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);
    render(<MockLoginBox />);
  });

  test('рендерить компонент LoginBox', () => {
    expect(screen.getByText(/DroneMessage/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Логін/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Пароль/i)).toBeInTheDocument();
    expect(screen.getByText(/Увійти/i)).toBeInTheDocument();
    expect(screen.getByText(/Реєстрація/i)).toBeInTheDocument();
    expect(screen.getByText(/Забули пароль\?/i)).toBeInTheDocument();
  });

  test('дозволяє користувачам вводити логін і пароль', () => {
    const usernameInput = screen.getByPlaceholderText(/Логін/i);
    const passwordInput = screen.getByPlaceholderText(/Пароль/i);

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    expect(usernameInput.value).toBe('testUser');
    expect(passwordInput.value).toBe('testPassword');
  });

  test('показує повідомлення про помилку при невдалому вході', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Невірний логін або пароль' }),
      })
    );

    fireEvent.change(screen.getByPlaceholderText(/Логін/i), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByPlaceholderText(/Пароль/i), { target: { value: 'wrongPassword' } });
    fireEvent.click(screen.getByText(/Увійти/i));

    await waitFor(() => {
      expect(screen.getByText(/Невірний логін або пароль/i)).toBeInTheDocument();
    });
  });

  test('перенаправляє на панель управління при успішному вході', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Успішно увійшли!' }),
      })
    );

    fireEvent.change(screen.getByPlaceholderText(/Логін/i), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByPlaceholderText(/Пароль/i), { target: { value: 'testPassword' } });
    fireEvent.click(screen.getByText(/Увійти/i));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/dashboard');
    });
  });
});
