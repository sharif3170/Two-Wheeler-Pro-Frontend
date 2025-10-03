import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import './LoginHistory.css';

const LoginHistory = () => {
  const { user } = useUser();
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLoginHistory = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/login-history`,
          {
            headers: {
              'user-id': user._id
            }
          }
        );
        
        setLoginHistory(response.data.loginHistory);
      } catch (err) {
        setError('Failed to fetch login history. Please try again.');
        console.error('Error fetching login history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoginHistory();
  }, [user]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const formatIP = (ip) => {
    // Handle localhost addresses
    if (ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1') {
      return 'localhost';
    }
    
    // Remove IPv6 prefix if present
    if (ip && ip.startsWith('::ffff:')) {
      return ip.substring(7);
    }
    
    return ip || 'Unknown';
  };

  const getDeviceInfo = (login) => {
    if (login.device && login.device !== 'Other') {
      return login.device;
    }
    return 'Unknown Device';
  };

  const getBrowserInfo = (login) => {
    if (login.browser && login.browser !== 'Other 0.0.0') {
      return login.browser;
    }
    return 'Unknown Browser';
  };

  if (!user) {
    return (
      <div className="login-history-container">
        <div className="login-history-content">
          <h2>Please log in to view your login history</h2>
          <p>You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-history-container">
      <div className="login-history-header">
        <h1>Login History</h1>
        <p>View your recent login activity</p>
      </div>

      <div className="login-history-content">
        {loading ? (
          <div className="loading">Loading login history...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : loginHistory.length === 0 ? (
          <div className="no-history">
            <p>No login history found.</p>
          </div>
        ) : (
          <div className="history-list">
            {loginHistory.map((login, index) => (
              <div key={index} className="history-item">
                <div className="history-details">
                  <div className="history-row">
                    <span className="label">Date & Time:</span>
                    <span className="value">{formatTimestamp(login.timestamp)}</span>
                  </div>
                  <div className="history-row">
                    <span className="label">IP Address:</span>
                    <span className="value">{formatIP(login.ip)}</span>
                  </div>
                  <div className="history-row">
                    <span className="label">Location:</span>
                    <span className="value">{login.location || 'Unknown'}</span>
                  </div>
                  <div className="history-row">
                    <span className="label">Device:</span>
                    <span className="value">{getDeviceInfo(login)}</span>
                  </div>
                  <div className="history-row">
                    <span className="label">Browser:</span>
                    <span className="value">{getBrowserInfo(login)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginHistory;