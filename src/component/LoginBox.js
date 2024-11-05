import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginBox.css';

const LoginBox = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8082/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate('/dashboard'); 
      } else {
        setError(data.message || 'Невірний логін або пароль');
      }
    } catch (error) {
      console.error('Помилка при вході:', error);
      setError('Не вдалося виконати вхід. Спробуйте ще раз.');
    }
  };

  return (
    <div className="login-box">
      <h2>DroneMessage</h2>
      <input
        type="text"
        placeholder="Логін"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleLogin} className="login-button">Увійти</button>
      <div className="links">
        <Link to="/register">Реєстрація</Link>
        <Link to="/recovery">Забули пароль?</Link>
      </div>
    </div>
  );
};

export default LoginBox;
