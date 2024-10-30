import React from 'react';
import './LoginBox.css';

const LoginBox = ({ setView }) => {
  return (
    <div className="login-box">
      <h2>DroneMessage</h2>
      <input type="text" placeholder="Логін" className="input-field" />
      <input type="password" placeholder="Пароль" className="input-field" />
      <div className="links">
        <a href="#" onClick={() => setView('register')}>Реєстрація</a>
        <a href="#" onClick={() => setView('recovery')}>Забули пароль?</a>
      </div>
      <button className="login-button" onClick={() => setView('dashboard')}>Увійти</button>
    </div>
  );
};

export default LoginBox;
