import React from 'react';
import './LoginBox.css';

const LoginBox = ({ setIsRegistering }) => {
  return (
    <div className="login-box">
      <h2>DroneMessage</h2>
      <input type="text" placeholder="Логін" className="input-field" />
      <input type="password" placeholder="Пароль" className="input-field" />
      <div className="links">
        <a href="#" onClick={() => setIsRegistering(true)}>Реєстрація</a>
        <a href="#">Забули пароль?</a>
      </div>
      <button className="login-button">Увійти</button>
    </div>
  );
};

export default LoginBox;
