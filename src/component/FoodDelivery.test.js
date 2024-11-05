import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FoodDelivery from './FoodDelivery';
import '@testing-library/jest-dom'; 

describe('FoodDelivery Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <FoodDelivery />
      </MemoryRouter>
    );
  });

  test('рендерить заголовок з полем пошуку та кнопкою кошика', () => {
    expect(screen.getByPlaceholderText(/Пошук/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument();
  });

  test('пошук товарів оновлює рекомендації', () => {
    const searchInput = screen.getByPlaceholderText(/Пошук/i);
    fireEvent.change(searchInput, { target: { value: 'Burger' } });

    expect(screen.getByAltText(/Burger/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/Pizza/i)).not.toBeInTheDocument();
  });

  test('додає товар до кошика', () => {
    const burgerImage = screen.getByAltText(/Burger/i);
    fireEvent.click(burgerImage);
    
    fireEvent.click(screen.getByRole('button', { name: /cart/i }));
    
    expect(screen.getByText(/Burger/i)).toBeInTheDocument();
    expect(screen.getByText(/1/i)).toBeInTheDocument(); 
  });

  test('збільшує кількість товару в кошику', () => {
    const burgerImage = screen.getByAltText(/Burger/i);
    fireEvent.click(burgerImage); 
    fireEvent.click(screen.getByRole('button', { name: /cart/i })); 

    const increaseButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(increaseButton);

    expect(screen.getByText(/2/i)).toBeInTheDocument(); 
  });

  test('зменшує кількість товару в кошику', () => {
    const burgerImage = screen.getByAltText(/Burger/i);
    fireEvent.click(burgerImage); 
    fireEvent.click(screen.getByRole('button', { name: /cart/i })); 

    const increaseButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(increaseButton); 
    const decreaseButton = screen.getByRole('button', { name: '-' });
    fireEvent.click(decreaseButton); 

    expect(screen.getByText(/1/i)).toBeInTheDocument(); 
  });

  test('видаляє товар з кошика, коли кількість 1', () => {
    const burgerImage = screen.getByAltText(/Burger/i);
    fireEvent.click(burgerImage); 
    fireEvent.click(screen.getByRole('button', { name: /cart/i })); 

    const decreaseButton = screen.getByRole('button', { name: '-' });
    fireEvent.click(decreaseButton); 

    expect(screen.queryByText(/Burger/i)).not.toBeInTheDocument(); 
  });
});
