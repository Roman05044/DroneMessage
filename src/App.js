import React, { useState } from 'react';
import LoginBox from './component/LoginBox';
import RegistrationBox from './component/RegistrationBox';
import DroneImage from './component/DroneImage';
import background from './img/back.png';

const App = () => {
  const [isRegistering, setIsRegistering] = useState(false);

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
    <div style={containerStyle}>
      {isRegistering ? (
        <RegistrationBox setIsRegistering={setIsRegistering} />
      ) : (
        <LoginBox setIsRegistering={setIsRegistering} />
      )}
      <DroneImage />
    </div>
  );
};

export default App;
