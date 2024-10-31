import React, { useState } from 'react';
import './FoodDelivery.css';
import burgerImage from '../img/burger.png';
import pizzaImage from '../img/pizza.png';
import sushiImage from '../img/sushi.png';
import steakImage from '../img/steak.png';
import cartIcon from '../img/cart.png';
import ukrBurgersBanner from '../img/ukrBurgersBanner.png';

const FoodDelivery = ({ setView }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({});
  
  const menuItems = [
    { id: 1, name: 'Burger', image: burgerImage },
    { id: 2, name: 'Pizza', image: pizzaImage },
    { id: 3, name: 'Sushi', image: sushiImage },
    { id: 4, name: 'Steak', image: steakImage }
  ];

  const toggleCart = () => setCartOpen(!isCartOpen);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (item) => {
    setCart((prevCart) => {
      const itemInCart = prevCart[item.id];
      const updatedQuantity = itemInCart ? itemInCart.quantity + 1 : 1;
      return {
        ...prevCart,
        [item.id]: { ...item, quantity: updatedQuantity }
      };
    });
  };

  const increaseQuantity = (itemId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: {
        ...prevCart[itemId],
        quantity: prevCart[itemId].quantity + 1
      }
    }));
  };

  const decreaseQuantity = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[itemId].quantity === 1) {
        delete updatedCart[itemId];
      } else {
        updatedCart[itemId].quantity -= 1;
      }
      return updatedCart;
    });
  };

  return (
    <div className="food-delivery-container">
      <div className="header">
        <button onClick={() => setView('dashboard')} className="home-button">🏠</button>
        <input
          type="text"
          placeholder="Пошук"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <button onClick={toggleCart} className="cart-button">
          <img src={cartIcon} alt="Cart" />
        </button>
      </div>

      <div className="recommendations">
        <img src={ukrBurgersBanner} alt="Сезон українських бургерів" className="banner" />
        <h2>Рекомендації</h2>
        <div className="recommendations-list">
          {filteredItems.map(item => (
            <img
              key={item.id}
              src={item.image}
              alt={item.name}
              onClick={() => addToCart(item)}
              className="menu-item"
            />
          ))}
        </div>
      </div>

      {/* Віджет-меню для корзини */}
      <div className={`cart-widget ${isCartOpen ? 'open' : 'closed'}`}>
        <h3>Кошик</h3>
        <div className="cart-items">
          {Object.values(cart).map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <p>{item.quantity}</p>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
          ))}
        </div>
        <button className="order-button">Замовити</button>
      </div>
    </div>
  );
};

export default FoodDelivery;
