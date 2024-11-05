import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom'; 
import Dashboard from './Dashboard'; 

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Компонент Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('рендерити компонент Dashboard', () => {
    render(<Dashboard />);
    expect(screen.getByText('Гість')).toBeInTheDocument(); 
  });

  it('дозволяє змінити ім\'я користувача', () => {
    render(<Dashboard />);
    const nameInput = screen.getByRole('heading', { editable: true });
    
    fireEvent.input(nameInput, { target: { textContent: 'Новий користувач' } });
    expect(nameInput.textContent).toBe('Новий користувач');
  });

  it('дозволяє завантажити профільне зображення', () => {
    render(<Dashboard />);
    
    const file = new File(['dummy content'], 'profile.jpg', { type: 'image/jpeg' });
    
    const fileInput = screen.getByTitle('Натисніть, щоб завантажити фото');

    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });
    
    fireEvent.change(fileInput);
    
    expect(fileInput.files[0]).toStrictEqual(file);
    expect(fileInput.files.length).toBe(1);
  });

  it('перенаправляє на карту посилок при натисканні кнопки', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(<Dashboard />);

    const button = screen.getByRole('button', { name: /Пошта/i });
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith('/parcelMap');
  });
});
