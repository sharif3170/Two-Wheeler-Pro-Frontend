import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import './CommunicationPreferences.css';

const CommunicationPreferences = () => {
  const { user, updateUser } = useUser();
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    newsletter: true,
    promotionalEmails: false,
    productUpdates: true
  });
  const [isSaving, setIsSaving] = useState(false);

  // Load preferences from user data when component mounts
  useEffect(() => {
    if (user && user.preferences) {
      setPreferences(user.preferences);
    }
  }, [user]);

  const handleToggle = (prefName) => {
    setPreferences(prev => ({
      ...prev,
      [prefName]: !prev[prefName]
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real app, you would save this to the backend
      // For now, we'll just update the user context
      updateUser({ preferences });
      
      // Show success message
      alert('Communication preferences updated successfully!');
    } catch (error) {
      alert('Failed to update preferences. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="preferences-container">
        <div className="preferences-content">
          <h2>Please log in to manage your communication preferences</h2>
          <p>You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="preferences-container">
      <div className="preferences-header">
        <h1>Communication Preferences</h1>
        <p>Manage how you want to be contacted</p>
      </div>

      <div className="preferences-content">
        <div className="preferences-section">
          <h2>Notification Preferences</h2>
          <div className="preference-item">
            <div className="preference-info">
              <h3>Email Notifications</h3>
              <p>Receive important notifications via email</p>
            </div>
            <div className="toggle-switch">
              <button 
                className={`toggle-btn ${preferences.emailNotifications ? 'enabled' : 'disabled'}`}
                onClick={() => handleToggle('emailNotifications')}
              >
                {preferences.emailNotifications ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <h3>SMS Notifications</h3>
              <p>Receive important notifications via text message</p>
            </div>
            <div className="toggle-switch">
              <button 
                className={`toggle-btn ${preferences.smsNotifications ? 'enabled' : 'disabled'}`}
                onClick={() => handleToggle('smsNotifications')}
              >
                {preferences.smsNotifications ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <h3>Push Notifications</h3>
              <p>Receive notifications on your mobile device</p>
            </div>
            <div className="toggle-switch">
              <button 
                className={`toggle-btn ${preferences.pushNotifications ? 'enabled' : 'disabled'}`}
                onClick={() => handleToggle('pushNotifications')}
              >
                {preferences.pushNotifications ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        <div className="preferences-section">
          <h2>Marketing Preferences</h2>
          <div className="preference-item">
            <div className="preference-info">
              <h3>Newsletter</h3>
              <p>Receive our monthly newsletter with industry updates</p>
            </div>
            <div className="toggle-switch">
              <button 
                className={`toggle-btn ${preferences.newsletter ? 'enabled' : 'disabled'}`}
                onClick={() => handleToggle('newsletter')}
              >
                {preferences.newsletter ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <h3>Promotional Emails</h3>
              <p>Receive special offers and promotions</p>
            </div>
            <div className="toggle-switch">
              <button 
                className={`toggle-btn ${preferences.promotionalEmails ? 'enabled' : 'disabled'}`}
                onClick={() => handleToggle('promotionalEmails')}
              >
                {preferences.promotionalEmails ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="preference-item">
            <div className="preference-info">
              <h3>Product Updates</h3>
              <p>Be notified about new features and updates</p>
            </div>
            <div className="toggle-switch">
              <button 
                className={`toggle-btn ${preferences.productUpdates ? 'enabled' : 'disabled'}`}
                onClick={() => handleToggle('productUpdates')}
              >
                {preferences.productUpdates ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        <div className="preferences-actions">
          <button 
            className="save-btn"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPreferences;