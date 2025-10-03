import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // In a real app, you would send this to your backend
    console.log('Subscribing email:', email);
    
    // Show success message
    setShowSuccessMessage(true);
    setEmail('');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Two Wheeler Pro</h3>
            <p>Your trusted destination for premium two-wheelers. Discover, compare, and own your dream bike.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/vehicles">Browse Vehicles</Link></li>
              <li><Link to="/compare">Compare Models</Link></li>
              <li><Link to="/calculator">Calculators</Link></li>
              <li><Link to="/showrooms">Showrooms</Link></li>
              <li><Link to="/upcoming">Upcoming Launches</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/test-ride">Book Test Ride</Link></li>
              <li><Link to="/sell">Sell Your Bike</Link></li>
              <li><Link to="/profile">My Account</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul>
              <li><i className="fas fa-envelope"></i> support@twowheelerpro.com</li>
              <li><i className="fas fa-phone"></i> +91 98765 43210</li>
              <li><i className="fas fa-map-marker-alt"></i> 123 Two Wheeler Street, Mumbai</li>
              <li><Link to="/contact"><i className="fas fa-comment"></i> Send Feedback</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-links">
            <Link to="/terms">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/refund">Refund Policy</Link>
          </div>
          <p>&copy; 2025 Two Wheeler Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;