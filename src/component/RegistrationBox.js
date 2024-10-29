import React from 'react';
import './RegistrationBox.css';

const RegistrationBox = ({ setView }) => {
  return (
    <div className="registration-box">
      <h2>DroneMessage</h2>
      <input type="text" placeholder="Логін" className="input-field" />
      <input type="email" placeholder="Електронна пошта" className="input-field" />
      <input type="password" placeholder="Пароль" className="input-field" />
      <input type="password" placeholder="Повторіть пароль" className="input-field" />
      <button className="register-button">Створити</button>
      <div className="links">
        <a href="#" onClick={() => setView('login')}>Вже є обліковий запис?</a>
      </div>
    </div>
  );
};

export default RegistrationBox;
