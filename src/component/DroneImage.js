import React from 'react';
import './DroneImage.css'; 
import mainDrone from '../img/MainDrone.png'; 

const DroneImage = () => {
  return (
    <div className="drone-image">
      <img src={mainDrone} alt="Drone" />
    </div>
  );
};

export default DroneImage;
