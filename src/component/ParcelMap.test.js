import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ParcelMap from './ParcelMap';
import '@testing-library/jest-dom';

describe('Компонент ParcelMap', () => {
  test('рендерить компонент ParcelMap', () => {
    render(
      <MemoryRouter>
        <ParcelMap />
      </MemoryRouter>
    );

    const mapImage = screen.getByAltText(/map/i);
    expect(mapImage).toBeInTheDocument();

    const startInput = screen.getByPlaceholderText(/Пошук відділення, поштомату \(Початкова точка\)/i);
    const endInput = screen.getByPlaceholderText(/Пошук відділення, поштомату \(Кінцева точка\)/i);
    expect(startInput).toBeInTheDocument();
    expect(endInput).toBeInTheDocument();
  });

  test('оновлює терміни пошуку та показує пропозиції', () => {
    render(
      <MemoryRouter>
        <ParcelMap />
      </MemoryRouter>
    );

    const startInput = screen.getByPlaceholderText(/Пошук відділення, поштомату \(Початкова точка\)/i);

    fireEvent.change(startInput, { target: { value: '1' } });
    expect(startInput.value).toBe('1');

    const suggestionItem = screen.getByText('1 - Нова Пошта 1');
    expect(suggestionItem).toBeInTheDocument();
  });

  test('вибирає пропозицію та оновлює введення', () => {
    render(
      <MemoryRouter>
        <ParcelMap />
      </MemoryRouter>
    );

    const startInput = screen.getByPlaceholderText(/Пошук відділення, поштомату \(Початкова точка\)/i);
    fireEvent.change(startInput, { target: { value: '1' } });

    const suggestionItem = screen.getByText('1 - Нова Пошта 1');
    fireEvent.click(suggestionItem);

    expect(startInput.value).toBe('1 - Нова Пошта 1');
  });
});
