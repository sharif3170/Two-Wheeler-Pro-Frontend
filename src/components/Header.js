import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import AuthForm from './AuthForm';
import { useUser } from '../contexts/UserContext';
import './Header.css';

const Header = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // New state to track auth mode
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Check if user is a dealer (in a real app, this would come from user data)
  const isDealer = user && user.email.includes('dealer');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/vehicles?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const openAuthForm = (mode) => {
    setAuthMode(mode);
    setShowAuthForm(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.hamburger-btn')) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link to="/" onClick={closeMenu}>
                <Logo />
              </Link>
            </div>
            {/* Desktop navigation */}
            <nav className="nav desktop-nav">
              <ul>
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/vehicles" onClick={closeMenu}>Browse Vehicles</Link></li>
                <li><Link to="/compare" onClick={closeMenu}>Compare</Link></li>
                <li><Link to="/calculator" onClick={closeMenu}>Calculators</Link></li>
                <li><Link to="/showrooms" onClick={closeMenu}>Showrooms</Link></li>
                <li><Link to="/upcoming" onClick={closeMenu}>Upcoming Launches</Link></li>
                <li><Link to="/test-ride" onClick={closeMenu}>Test Ride</Link></li>
                <li><Link to="/sell" onClick={closeMenu}>Sell Vehicle</Link></li>
                {!user ? (
                  <>
                    <li>
                      <button 
                        className="signup-btn-stunning" 
                        onClick={() => openAuthForm('signup')}
                      >
                        Sign Up
                      </button>
                    </li>
                    <li>
                      <button 
                        className="login-btn" 
                        onClick={() => openAuthForm('login')}
                      >
                        Login
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                    {isDealer && <li><Link to="/dealer" onClick={closeMenu}>Dealer Dashboard</Link></li>}
                    <li>
                      <button onClick={logout} className="logout-btn">Logout</button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            {/* Mobile hamburger menu button */}
            <div className="mobile-menu-toggle">
              <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle menu">
                <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
                <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
                <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
              </button>
            </div>
            <div className="auth-section">
              {user ? (
                <div className="user-menu">
                  <button onClick={logout} className="logout-btn">Logout</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile navigation menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-content">
          <ul>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/vehicles" onClick={closeMenu}>Browse Vehicles</Link></li>
            <li><Link to="/compare" onClick={closeMenu}>Compare</Link></li>
            <li><Link to="/calculator" onClick={closeMenu}>Calculators</Link></li>
            <li><Link to="/showrooms" onClick={closeMenu}>Showrooms</Link></li>
            <li><Link to="/upcoming" onClick={closeMenu}>Upcoming Launches</Link></li>
            <li><Link to="/test-ride" onClick={closeMenu}>Test Ride</Link></li>
            <li><Link to="/sell" onClick={closeMenu}>Sell Vehicle</Link></li>
            {!user ? (
              <>
                <li>
                  <button 
                    className="signup-btn-stunning" 
                    onClick={() => {
                      closeMenu();
                      openAuthForm('signup');
                    }}
                  >
                    Sign Up
                  </button>
                </li>
                <li>
                  <button 
                    className="login-btn" 
                    onClick={() => {
                      closeMenu();
                      openAuthForm('login');
                    }}
                  >
                    Login
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
                {isDealer && <li><Link to="/dealer" onClick={closeMenu}>Dealer Dashboard</Link></li>}
                <li>
                  <button 
                    onClick={() => {
                      closeMenu();
                      logout();
                    }} 
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      
      {/* Full-width search bar below header - hidden in mobile */}
      <div className="search-bar-container">
        <form className="search-bar" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search for bikes, scooters, brands, models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn"></button>
          </div>
        </form>
      </div>
      
      {showAuthForm && <AuthForm onClose={() => setShowAuthForm(false)} initialMode={authMode} />}
    </>
  );
};

export default Header;
