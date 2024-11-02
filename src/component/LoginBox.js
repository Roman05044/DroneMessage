import React from 'react';
import { Link } from 'react-router-dom';
import './LoginBox.css';

const LoginBox = () => {
  return (
    <div className="login-box">
      <h2>DroneMessage</h2>
      <input type="text" placeholder="Логін" className="input-field" />
      <input type="password" placeholder="Пароль" className="input-field" />
      <div className="links">
        <Link to="/register">Реєстрація</Link>
        <Link to="/recovery">Забули пароль?</Link>
      </div>
      <button className="login-button">
        <Link to="/dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Увійти</Link>
      </button>
    </div>
  );
};

export default LoginBox;
