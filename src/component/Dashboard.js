import React, { useState } from 'react';
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
  const navigate = useNavigate();

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
          <div className="profile-pic" title="Натисніть, щоб завантажити фото"></div>
          <h4>Логін</h4>
          <label className="option">
            <input type="checkbox" /> Зберігати дані
          </label>
          <label className="option">
            <input
              type="checkbox"
              checked={showRecommendations}
              onChange={(e) => setShowRecommendations(e.target.checked)}
            /> Показувати рекомендації
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
