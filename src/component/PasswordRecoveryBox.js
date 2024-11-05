import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PasswordRecoveryBox.css';

const PasswordRecoveryBox = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordRecovery = async () => {
    if (newPassword !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }

    try {
      const response = await fetch('http://localhost:8082/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, newPassword })
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate('/'); 
      } else {
        setError(data.message || 'Невірний логін');
      }
    } catch (error) {
      console.error('Помилка при зміні паролю:', error);
      setError('Не вдалося змінити пароль. Спробуйте ще раз.');
    }
  };

  return (
    <div className="recovery-box">
      <h2>Відновлення паролю</h2>
      <input
        type="text"
        placeholder="Логін"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Новий пароль"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
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
      <button onClick={handlePasswordRecovery} className="next-button">Змінити пароль</button>
      <div className="links">
        <Link to="/">Повернутися до входу</Link>
      </div>
    </div>
  );
};

export default PasswordRecoveryBox;
