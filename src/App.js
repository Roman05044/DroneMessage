import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginBox from './component/LoginBox';
import RegistrationBox from './component/RegistrationBox';
import PasswordRecoveryBox from './component/PasswordRecoveryBox';
import Dashboard from './component/Dashboard';
import FoodDelivery from './component/FoodDelivery';
import ParcelMap from './component/ParcelMap';
import background from './img/back.png';

const App = () => {
  const containerStyle = {
    backgroundImage: `url(${background})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '96vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <Router>
      <div style={containerStyle}>
        <Routes>
          <Route path="/" element={<LoginBox />} />
          <Route path="/register" element={<RegistrationBox />} />
          <Route path="/recovery" element={<PasswordRecoveryBox />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/foodDelivery" element={<FoodDelivery />} />
          <Route path="/parcelMap" element={<ParcelMap />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
