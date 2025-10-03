import React from 'react';
import './Logo.css';
import logoImage from '../assets/logo.jpeg';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logoImage} alt="Vaahan Bazaar Logo" className="logo-image" />
      <div className="logo-text">
        <span className="logo-highlight">Two</span>
        <span className="logo-normal">Wheeler</span>
        <span className="logo-pro">Pro</span>
      </div>
    </div>
  );
};

export default Logo;