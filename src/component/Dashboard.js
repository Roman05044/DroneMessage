import React, { useState } from 'react';
import './Dashboard.css';
import ukrPoshtaLogo from '../img/ukrPoshta.png';
import novaPoshtaLogo from '../img/novaPoshta.png';
import mcdonaldsLogo from '../img/mcdonalds.png';
import glovoLogo from '../img/glovo.png';

const Dashboard = ({ setView }) => {
  const [isWidgetOpen, setWidgetOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [showRecommendations, setShowRecommendations] = useState(true);

  const toggleWidget = () => {
    setWidgetOpen(!isWidgetOpen);
  };

  const handleHistoryChange = (event) => {
    setShowHistory(event.target.checked);
  };

  const handleRecommendationsChange = (event) => {
    setShowRecommendations(event.target.checked);
  };

  return (
    <div className="dashboard-container">
        <div className="button-container">
          <button className="image-button-posht">
          <span className="button-text">Пошта</span>
          <div className="image-container">
            <img src={ukrPoshtaLogo} alt="Укрпошта" />
            <img src={novaPoshtaLogo} alt="Нова Пошта" />
          </div>
          </button>

          <button 
            className="image-button-food" 
            onClick={() => setView('foodDelivery')} 
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
                onChange={handleRecommendationsChange}
              /> Показувати рекомендації
            </label>
            <label className="option">
              <input
                type="checkbox"
                checked={showHistory}
                onChange={handleHistoryChange}
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
