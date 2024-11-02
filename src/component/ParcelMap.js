import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ParcelMap.css';
import mapImage from '../img/mapImage.png';

const ParcelMap = () => {
  const [startSearchTerm, setStartSearchTerm] = useState('');
  const [endSearchTerm, setEndSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const navigate = useNavigate();

  const parcelLockers = [
    { id: 1, left: '71.4%', top: '71.2%', address: 'Нова Пошта 1' },
    { id: 2, left: '56.7%', top: '61.5%', address: 'Нова Пошта 2' },
    { id: 3, left: '66.9%', top: '16.8%', address: 'Нова Пошта3' },
    { id: 4, left: '14.7%', top: '60.8%', address: 'Нова Пошта 4' },
    { id: 5, left: '40.2%', top: '83.3%', address: 'Нова Пошта 5' },
    { id: 6, left: '31%', top: '7%', address: 'Нова Пошта 6' },
    { id: 7, left: '52.1%', top: '41%', address: 'Нова Пошта 7' },
    { id: 8, left: '49.2%', top: '2.7%', address: 'Нова Пошта 8' },
    { id: 9, left: '49.2%', top: '26.7%', address: 'Нова Пошта 9' },
    { id: 10, left: '31.3%', top: '62.1%', address: 'Нова Пошта 10' },
    { id: 12, left: '60.8%', top: '12%', address: 'Нова Пошта 12' },
    { id: 13, left: '36%', top: '90%', address: 'Нова Пошта 13' },
    { id: 14, left: '45.3%', top: '36.3%', address: 'Нова Пошта 14' },
    { id: 15, left: '57.9%', top: '10.4%', address: 'Нова Пошта 15' },
    { id: 17, left: '17%', top: '46%', address: 'Нова Пошта 17' },
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

  const handleLockerClick = (locker) => {
    const lockerInfo = `${locker.id} - ${locker.address}`;
    if (activeInput === 'start') {
      setStartSearchTerm(lockerInfo);
    } else if (activeInput === 'end') {
      setEndSearchTerm(lockerInfo);
    }
  };

  return (
    <div className="parcel-map-container">
      <img src={mapImage} alt="Map" className="map-background" />
      <button onClick={() => navigate('/dashboard')} className="home-button">🏠</button>
      {parcelLockers.map((locker) => (
        <div 
          key={locker.id} 
          className="parcel-locker-point" 
          style={{ left: locker.left, top: locker.top }}
          title={`Parcel Locker ${locker.id}`}
          onClick={() => handleLockerClick(locker)}
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
          onFocus={() => setActiveInput('start')}
        />
        <input 
          type="text" 
          placeholder="Пошук відділення, поштомату (Кінцева точка)"
          value={endSearchTerm}
          onChange={(e) => handleSearchChange(e, 'end')}
          onFocus={() => setActiveInput('end')}
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
