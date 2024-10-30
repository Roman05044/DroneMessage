import React, { useState } from 'react';
import LoginBox from './component/LoginBox';
import RegistrationBox from './component/RegistrationBox';
import PasswordRecoveryBox from './component/PasswordRecoveryBox';
import Dashboard from './component/Dashboard';
import background from './img/back.png';

const App = () => {
  const [view, setView] = useState('login'); 

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
      {view === 'login' && <LoginBox setView={setView} />}
      {view === 'register' && <RegistrationBox setView={setView} />}
      {view === 'recovery' && <PasswordRecoveryBox setView={setView} />}
      {view === 'dashboard' && <Dashboard setView={setView} />}
    </div>
  );
};

export default App;
