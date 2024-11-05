import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import ukrPoshtaLogo from '../img/ukrPoshta.png';
import novaPoshtaLogo from '../img/novaPoshta.png';
import mcdonaldsLogo from '../img/mcdonalds.png';
import glovoLogo from '../img/glovo.png';

const Dashboard = () => {
  const [isWidgetOpen, setWidgetOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [username, setUsername] = useState('Гість');
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Симуляція завантаження даних користувача
    const storedUser = localStorage.getItem('username');
    const storedPic = localStorage.getItem('profilePic');
    if (storedUser) {
      setUsername(storedUser);
    }
    if (storedPic) {
      setProfilePic(storedPic);
    }
  }, []);

  const handleUsernameChange = (e) => {
    const newUsername = e.target.innerText;
    setUsername(newUsername);
    localStorage.setItem('username', newUsername);
    // Запит для збереження на сервері
    fetch('/update-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: newUsername })
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
        localStorage.setItem('profilePic', reader.result);
        // Запит для збереження фото на сервері
        fetch('/update-profile-pic', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image: reader.result })
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleWidget = () => {
    setWidgetOpen(!isWidgetOpen);
  };

  return (
    <div className="dashboard-container">
      <div className="button-container">
        <button 
          className="image-button-posht" 
          onClick={() => navigate('/parcelMap')}
        >
          <span className="button-text">Пошта</span>
          <div className="image-container">
            <img src={ukrPoshtaLogo} alt="Укрпошта" />
            <img src={novaPoshtaLogo} alt="Нова Пошта" />
          </div>
        </button>

        <button 
          className="image-button-food" 
          onClick={() => navigate('/foodDelivery')}
        >
          <span className="button-text">Доставка їжі</span>
          <div className="image-container">
            <img src={glovoLogo} alt="Глово" />
            <img src={mcdonaldsLogo} alt="McDonald's" />
          </div>
        </button>
        
        <div className="ad-banner">
          <p>Тут може бути ваша реклама</p>
        </div>
      </div>

      <div className={`side-widget ${isWidgetOpen ? 'open' : 'closed'}`}>
        <button
          className="toggle-widget-button"
          onClick={toggleWidget}
        >
          {isWidgetOpen ? '⬅' : '➡'}
        </button>
        <div className="profile-section">
          <div 
            className="profile-pic" 
            title="Натисніть, щоб завантажити фото"
            onClick={() => document.getElementById('fileInput').click()}
          >
            {profilePic ? (
              <img src={profilePic} alt="Профіль" />
            ) : (
              <div>Фото</div>
            )}
          </div>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <h4
            contentEditable={true}
            onBlur={handleUsernameChange}
          >
            {username}
          </h4>
          <label className="option">
            <input type="checkbox" /> Зберігати дані
          </label>
          <label className="option">
            <input
              type="checkbox"
              checked={showHistory}
              onChange={(e) => setShowHistory(e.target.checked)}
            /> Історія
          </label>
          {showHistory && (
            <div className="history-message">
              <p>тут порожньо<br />зробіть перше замовлення</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
