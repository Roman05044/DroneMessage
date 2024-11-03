import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationBox.css';

const RegistrationBox = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    try {
      const response = await fetch('http://localhost:8082/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate('/'); 
      } else {
        console.error('Помилка з серверу:', data.message);
        setError(data.message || 'Помилка реєстрації');
      }
    } catch (error) {
      console.error('Помилка при виконанні запиту:', error);
      setError('Не вдалося виконати реєстрацію. Спробуйте ще раз.');
    }
  };

  return (
    <div className="registration-box">
      <h2>Реєстрація</h2>
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
      <input
        type="password"
        placeholder="Повторіть пароль"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="input-field"
      />
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleRegister} className="register-button">Створити</button>
      <div className="links">
        <Link to="/">Вже є обліковий запис?</Link>
      </div>
    </div>
  );
};

export default RegistrationBox;
