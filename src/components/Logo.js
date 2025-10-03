import React from 'react';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo-content">
        <span className="logo-highlight">Two</span>
        <span className="logo-normal">Wheeler</span>
        <span className="logo-pro">Pro</span>
      </div>
    </div>
  );
};

export default Logo;