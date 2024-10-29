import React, { useState } from 'react';
import './PasswordRecoveryBox.css';

const PasswordRecoveryBox = ({ setView }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePasswordReset = () => {
    setView('login'); 
  };

  return (
    <div className="recovery-box">
      <h2>Відновлення паролю</h2>
      {step === 1 && (
        <>
          <input 
            type="email" 
            placeholder="Електронна пошта" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="input-field" 
          />
          <button className="next-button" onClick={handleNextStep}>Надіслати код</button>
        </>
      )}
      {step === 2 && (
        <>
          <input 
            type="text" 
            placeholder="Код з пошти" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            className="input-field" 
          />
          <button className="next-button" onClick={handleNextStep}>Підтвердити код</button>
        </>
      )}
      {step === 3 && (
        <>
          <input 
            type="password" 
            placeholder="Новий пароль" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="input-field" 
          />
          <input 
            type="password" 
            placeholder="Повторіть пароль" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="input-field" 
          />
          <button className="next-button" onClick={handlePasswordReset}>Змінити пароль</button>
        </>
      )}
      <div className="links">
        <a href="#" onClick={() => setView('login')}>Повернутися до входу</a>
      </div>
    </div>
  );
};

export default PasswordRecoveryBox;
