import React from 'react';
import { Link } from 'react-router-dom';
import './RegistrationBox.css';

const RegistrationBox = () => {
  return (
    <div className="registration-box">
      <h2>DroneMessage</h2>
      <input type="text" placeholder="Логін" className="input-field" />
      <input type="email" placeholder="Електронна пошта" className="input-field" />
      <input type="password" placeholder="Пароль" className="input-field" />
      <input type="password" placeholder="Повторіть пароль" className="input-field" />
      <button className="register-button">Створити</button>
      <div className="links">
        <Link to="/">Вже є обліковий запис?</Link>
      </div>
    </div>
  );
};

export default RegistrationBox;
