import React from 'react';
import LoginBox from './component/LoginBox';
import DroneImage from './component/DroneImage';
import background from './img/back.png'; 

const App = () => {
  const containerStyle = {
    backgroundImage: `url(${background})`,
    display: 'flex',
    alignItems: 'center',
    height: '96vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div style={containerStyle}>
      <LoginBox />
      <DroneImage />
    </div>
  );
};

export default App;
