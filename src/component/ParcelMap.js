import React, { useState } from 'react';
import './ParcelMap.css';
import mapImage from '../img/mapImage.png';

const ParcelMap = ({ setView }) => {
  const [startSearchTerm, setStartSearchTerm] = useState('');
  const [endSearchTerm, setEndSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);

  const parcelLockers = [
    { id: 1, left: '71.1%', top: '71.8%', address: 'Нова Пошта 1' },
    { id: 2, left: '56.6%', top: '62.4%', address: 'Нова Пошта 2' },
    { id: 3, left: '66.7%', top: '18%', address: 'Нова Пошта3' },
    { id: 4, left: '15%', top: '61.4%', address: 'Нова Пошта 4' },
    { id: 5, left: '40.2%', top: '83.5%', address: 'Нова Пошта 5' },
    { id: 6, left: '31.2%', top: '8%', address: 'Нова Пошта 6' },
    { id: 7, left: '52.1%', top: '42%', address: 'Нова Пошта 7' },
    { id: 8, left: '49.3%', top: '3.8%', address: 'Нова Пошта 8' },
    { id: 9, left: '49.3%', top: '27.5%', address: 'Нова Пошта 9' },
    { id: 10, left: '31.4%', top: '62.5%', address: 'Нова Пошта 10' },
    { id: 12, left: '60.7%', top: '13%', address: 'Нова Пошта 12' },
    { id: 13, left: '36.2%', top: '90%', address: 'Нова Пошта 13' },
    { id: 14, left: '45.4%', top: '37%', address: 'Нова Пошта 14' },
    { id: 15, left: '57.9%', top: '11.5%', address: 'Нова Пошта 15' },
    { id: 17, left: '17.3%', top: '46.6%', address: 'Нова Пошта 17' },
 ];

  const handleSearchChange = (event, field) => {
    const value = event.target.value;
    if (field === 'start') {
      setStartSearchTerm(value);
      setActiveInput('start');
    } else {
      setEndSearchTerm(value);
      setActiveInput('end');
    }

    if (value) {
      const filteredSuggestions = parcelLockers
        .filter((locker) => locker.id.toString().includes(value))
        .map((locker) => `${locker.id} - ${locker.address}`);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (activeInput === 'start') {
      setStartSearchTerm(suggestion);
    } else if (activeInput === 'end') {
      setEndSearchTerm(suggestion);
    }
    setSuggestions([]);
  };

  return (
    <div className="parcel-map-container">
      <img src={mapImage} alt="Map" className="map-background" />
        <button onClick={() => setView('dashboard')} className="home-button">🏠</button>
      {parcelLockers.map((locker) => (
        <div 
          key={locker.id} 
          className="parcel-locker-point" 
          style={{ left: locker.left, top: locker.top }}
          title={`Parcel Locker ${locker.id}`}
        >
          <div className="tooltip">
            Відділення N{locker.id}<br />{locker.address}
          </div>
        </div>
      ))}
      
      <div className="search-menu">
        <input 
          type="text" 
          placeholder="Пошук відділення, поштомату (Початкова точка)"
          value={startSearchTerm}
          onChange={(e) => handleSearchChange(e, 'start')}
        />
        <input 
          type="text" 
          placeholder="Пошук відділення, поштомату (Кінцева точка)"
          value={endSearchTerm}
          onChange={(e) => handleSearchChange(e, 'end')}
        />
        <div className="suggestions">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="suggestion-item" 
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
        <button>Продовжити</button>
        <p>Замовлення спец доставки за телефоном...</p>
      </div>
    </div>
  );
};

export default ParcelMap;
