import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import vehiclesData from '../data/vehicles';
import './Profile.css';

const Profile = () => {
  const { user, logout, updateUser } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalValue, setModalValue] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [favorites, setFavorites] = useState([]);
  const [testRides, setTestRides] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [testRidesLoading, setTestRidesLoading] = useState(false);
  const [editingRide, setEditingRide] = useState(null);
  const [editRideData, setEditRideData] = useState({
    date: '',
    time: '',
    showroom: ''
  });
  const [activeVehicleTab, setActiveVehicleTab] = useState('both'); // 'both', 'favorites', 'testrides'

  const fetchFavorites = async () => {
    if (!user) return;
    
    setFavoritesLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/favorites/user`,
        {
          headers: {
            'user-id': user._id
          },
          withCredentials: true
        }
      );
      
      setFavorites(response.data.favorites || []);
      setActiveVehicleTab('favorites'); // Show only favorites after fetching
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
    } finally {
      setFavoritesLoading(false);
    }
  };

  const fetchTestRides = async () => {
    if (!user) return;
    
    setTestRidesLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/test-rides/user/${user._id}`,
        {
          withCredentials: true
        }
      );
      
      setTestRides(response.data.testRides || []);
      setActiveVehicleTab('testrides'); // Show only test rides after fetching
    } catch (error) {
      console.error('Error fetching test rides:', error);
      setTestRides([]);
    } finally {
      setTestRidesLoading(false);
    }
  };

  // Update profileData when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const openModal = (type, currentValue) => {
    setModalType(type);
    setModalValue(currentValue || '');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setModalValue('');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleModalSave = async () => {
    if (modalType === 'password') {
      // Handle password change
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        alert('Please fill in all password fields');
        return;
      }
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        alert('New password and confirm password do not match');
        return;
      }
      
      if (passwordData.newPassword.length < 6) {
        alert('New password must be at least 6 characters');
        return;
      }
      
      setIsLoading(true);
      try {
        // Make API call to change password
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/auth/change-password`,
          {
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'user-id': user._id
            },
            withCredentials: true
          }
        );
        
        // Close modal and show success message
        closeModal();
        alert('Password changed successfully!');
      } catch (error) {
        console.error('Error changing password:', error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert('Failed to change password. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
      return;
    }
    
    // Handle other field changes
    if (!modalValue) {
      alert('Please enter a value');
      return;
    }

    setIsLoading(true);
    try {
      let updatedData = {};
      
      switch (modalType) {
        case 'name':
          if (modalValue.length < 2) {
            alert('Name must be at least 2 characters');
            return;
          }
          updatedData = { name: modalValue };
          break;
        case 'email':
          if (!/\S+@\S+\.\S+/.test(modalValue)) {
            alert('Please enter a valid email address');
            return;
          }
          updatedData = { email: modalValue };
          break;
        case 'phone':
          if (!/^\d{10}$/.test(modalValue)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
          }
          updatedData = { phone: modalValue };
          break;
        default:
          return;
      }

      // Make API call to update user profile
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/auth/profile`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            'user-id': user._id // Send user ID in headers for authentication
          },
          withCredentials: true
        }
      );

      // Update local state
      setProfileData(prev => ({
        ...prev,
        ...response.data.user
      }));

      // Update the user context
      updateUser(response.data.user);
      
      // Close modal
      closeModal();
      
      // Show success message
      alert(`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} updated successfully!`);
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert(`Failed to update ${modalType}. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const removeTestRide = async (rideId) => {
    if (!window.confirm('Are you sure you want to cancel this test ride?')) {
      return;
    }
    
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/test-rides/${rideId}`,
        {
          withCredentials: true
        }
      );
      
      if (response.data.success) {
        // Update the test rides list
        setTestRides(prev => prev.filter(ride => ride._id !== rideId));
        alert('Test ride cancelled successfully');
      } else {
        alert(response.data.message || 'Failed to cancel test ride');
      }
    } catch (error) {
      console.error('Error cancelling test ride:', error);
      alert('Error cancelling test ride. Please try again.');
    }
  };

  const startEditingRide = (ride) => {
    setEditingRide(ride._id);
    setEditRideData({
      date: ride.date ? new Date(ride.date).toISOString().split('T')[0] : '',
      time: ride.time || '',
      showroom: ride.showroom || ''
    });
  };

  const cancelEditingRide = () => {
    setEditingRide(null);
    setEditRideData({
      date: '',
      time: '',
      showroom: ''
    });
  };

  const updateTestRide = async (rideId) => {
    // Validate required fields
    if (!editRideData.date || !editRideData.time || !editRideData.showroom) {
      alert('Please fill in all fields');
      return;
    }
    
    try {
      // First, we need to update the status to "pending" to indicate it's being rescheduled
      // Then update the details
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/test-rides/${rideId}/status`,
        { status: 'pending' },
        {
          withCredentials: true
        }
      );
      
      if (response.data.success) {
        // Update the local state with the new data
        setTestRides(prev => 
          prev.map(ride => 
            ride._id === rideId 
              ? { ...ride, ...editRideData, date: new Date(editRideData.date), status: 'pending' } 
              : ride
          )
        );
        
        setEditingRide(null);
        alert('Test ride updated successfully');
      } else {
        alert(response.data.message || 'Failed to update test ride');
      }
    } catch (error) {
      console.error('Error updating test ride:', error);
      alert('Error updating test ride. Please try again.');
    }
  };

  const getVehicleData = (vehicleId) => {
    if (!vehicleId) return null;
    return vehiclesData.find(vehicle => vehicle.id === parseInt(vehicleId));
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-content">
          <h2>Please log in to view your profile</h2>
          <p>You need to be logged in to access your profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="profile-info">
          <h1>{profileData.name}</h1>
          <p className="profile-email">{profileData.email}</p>
          {profileData.phone && <p className="profile-phone">{profileData.phone}</p>}
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
        <button 
          className={`tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button 
          className={`tab ${activeTab === 'vehicles' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('vehicles');
            fetchFavorites();
            fetchTestRides();
          }}
        >
          My Vehicles
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
            </div>
            
            <div className="profile-details">
              <div className="detail-row">
                <span className="label">Full Name:</span>
                <span className="value">{profileData.name}</span>
              </div>
              
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{profileData.email}</span>
              </div>
              
              <div className="detail-row">
                <span className="label">Phone:</span>
                <span className="value">{profileData.phone || 'Not provided'}</span>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Account Settings</h2>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Name</h3>
                <p>Update your full name</p>
              </div>
              <button 
                className="change-btn"
                onClick={() => openModal('name', profileData.name)}
              >
                Change
              </button>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Email Address</h3>
                <p>Update your email address</p>
              </div>
              <button 
                className="change-btn"
                onClick={() => openModal('email', profileData.email)}
              >
                Change
              </button>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Mobile Number</h3>
                <p>Update your mobile number</p>
              </div>
              <button 
                className="change-btn"
                onClick={() => openModal('phone', profileData.phone)}
              >
                Change
              </button>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Communication Preferences</h3>
                <p>Manage how you want to be contacted</p>
              </div>
              <button 
                className="change-btn"
                onClick={() => navigate('/preferences')}
              >
                Manage
              </button>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Privacy Settings</h3>
                <p>Control what information is visible to others</p>
              </div>
              <button className="change-btn">Manage</button>
            </div>
          </div>
        )}
        
        {activeTab === 'security' && (
          <div className="security-section">
            <h2>Security Settings</h2>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Password</h3>
                <p>Change your password regularly for better security</p>
              </div>
              <button 
                className="change-btn"
                onClick={() => openModal('password')}
              >
                Change
              </button>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Login History</h3>
                <p>View your recent login activity</p>
              </div>
              <button 
                className="change-btn"
                onClick={() => navigate('/login-history')}
              >
                View
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'vehicles' && (
          <div className="vehicles-section">
            <h2>My Vehicles</h2>
            
            <div className="vehicles-actions">
              <button 
                className={`vehicle-action-btn favorites-btn ${activeVehicleTab === 'favorites' ? 'active' : ''}`}
                onClick={() => {
                  // Only fetch if we don't have favorites data or if we're switching to this tab
                  if ((favorites.length === 0 && !favoritesLoading) || activeVehicleTab !== 'favorites') {
                    if (favorites.length === 0) {
                      fetchFavorites();
                    } else {
                      setActiveVehicleTab('favorites');
                    }
                  } else if (activeVehicleTab !== 'favorites') {
                    // Just switch tab if we already have data
                    setActiveVehicleTab('favorites');
                  }
                }}
                disabled={favoritesLoading}
              >
                <i className="fas fa-heart"></i>
                <span>Favorites {favoritesLoading ? '(Loading...)' : `(${favorites.length})`}</span>
              </button>
              
              <button 
                className={`vehicle-action-btn test-rides-btn ${activeVehicleTab === 'testrides' ? 'active' : ''}`}
                onClick={() => {
                  // Only fetch if we don't have test rides data or if we're switching to this tab
                  if ((testRides.length === 0 && !testRidesLoading) || activeVehicleTab !== 'testrides') {
                    if (testRides.length === 0) {
                      fetchTestRides();
                    } else {
                      setActiveVehicleTab('testrides');
                    }
                  } else if (activeVehicleTab !== 'testrides') {
                    // Just switch tab if we already have data
                    setActiveVehicleTab('testrides');
                  }
                }}
                disabled={testRidesLoading}
              >
                <i className="fas fa-motorcycle"></i>
                <span>Test Rides {testRidesLoading ? '(Loading...)' : `(${testRides.length})`}</span>
              </button>
              
              <button 
                className={`vehicle-action-btn ${activeVehicleTab === 'both' ? 'active' : ''}`}
                onClick={() => {
                  setActiveVehicleTab('both');
                  // Fetch any missing data when showing all
                  if (favorites.length === 0) fetchFavorites();
                  if (testRides.length === 0) fetchTestRides();
                }}
              >
                <i className="fas fa-th-large"></i>
                <span>Show All</span>
              </button>
            </div>

            <div className="vehicles-content">
              {(favoritesLoading || testRidesLoading) ? (
                <p>Loading vehicle data...</p>
              ) : (
                <>
                  {(activeVehicleTab === 'both' || activeVehicleTab === 'favorites') && (
                    <div className="favorites-list">
                      <h3>Favorites</h3>
                      {favorites.length === 0 ? (
                        <p>No favorites yet. Start adding vehicles to your favorites!</p>
                      ) : (
                        <div className="vehicles-grid">
                          {favorites.map(favorite => (
                            <div key={favorite._id} className="vehicle-card">
                              <img src={favorite.vehicleImage} alt={favorite.vehicleName} />
                              <div className="vehicle-info">
                                <h4>{favorite.vehicleName}</h4>
                                <p>{favorite.vehicleBrand}</p>
                                <p className="price">₹{favorite.vehiclePrice.toLocaleString()}</p>
                                <button 
                                  className="view-details-btn"
                                  onClick={() => navigate(`/vehicle/${favorite.vehicleId}`)}
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {(activeVehicleTab === 'both' || activeVehicleTab === 'testrides') && (
                    <div className="test-rides-list">
                      <h3>Test Rides</h3>
                      {testRides.length === 0 ? (
                        <p>No test rides booked yet.</p>
                      ) : (
                        <div className="test-rides-grid">
                          {testRides.map(ride => (
                            <div key={ride._id} className="test-ride-card">
                              {editingRide === ride._id ? (
                                // Edit mode
                                <div className="ride-edit-form">
                                  {getVehicleData(ride.vehicleId) ? (
                                    <div className="vehicle-header">
                                      <img 
                                        src={getVehicleData(ride.vehicleId).image} 
                                        alt={getVehicleData(ride.vehicleId).name} 
                                        className="vehicle-image"
                                      />
                                      <div className="vehicle-details">
                                        <h4>{getVehicleData(ride.vehicleId).name}</h4>
                                        <p>{getVehicleData(ride.vehicleId).brand}</p>
                                      </div>
                                    </div>
                                  ) : (
                                    <h4>Edit Test Ride</h4>
                                  )}
                                  <div className="form-group">
                                    <label>Date:</label>
                                    <input
                                      type="date"
                                      value={editRideData.date}
                                      onChange={(e) => setEditRideData({...editRideData, date: e.target.value})}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Time:</label>
                                    <input
                                      type="time"
                                      value={editRideData.time}
                                      onChange={(e) => setEditRideData({...editRideData, time: e.target.value})}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Showroom:</label>
                                    <input
                                      type="text"
                                      value={editRideData.showroom}
                                      onChange={(e) => setEditRideData({...editRideData, showroom: e.target.value})}
                                    />
                                  </div>
                                  <div className="edit-actions">
                                    <button 
                                      className="save-btn"
                                      onClick={() => updateTestRide(ride._id)}
                                    >
                                      Save
                                    </button>
                                    <button 
                                      className="cancel-btn"
                                      onClick={cancelEditingRide}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                // View mode
                                <div className="ride-info">
                                  {getVehicleData(ride.vehicleId) ? (
                                    <>
                                      <div className="vehicle-header">
                                        <img 
                                          src={getVehicleData(ride.vehicleId).image} 
                                          alt={getVehicleData(ride.vehicleId).name} 
                                          className="vehicle-image"
                                        />
                                        <div className="vehicle-details">
                                          <h4>{getVehicleData(ride.vehicleId).name}</h4>
                                          <p>{getVehicleData(ride.vehicleId).brand}</p>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <h4>{ride.vehicleId ? `Vehicle ID: ${ride.vehicleId}` : 'Vehicle'}</h4>
                                  )}
                                  <p><strong>Date:</strong> {new Date(ride.date).toLocaleDateString()}</p>
                                  <p><strong>Time:</strong> {ride.time}</p>
                                  <p><strong>Showroom:</strong> {ride.showroom}</p>
                                  <p><strong>Status:</strong> 
                                    <span className={`status ${ride.status || 'pending'}`}>
                                      {ride.status || 'pending'}
                                    </span>
                                  </p>
                                  <div className="ride-actions">
                                    <button 
                                      className="edit-btn"
                                      onClick={() => startEditingRide(ride)}
                                      disabled={ride.status === 'cancelled' || ride.status === 'completed'}
                                    >
                                      Edit
                                    </button>
                                    <button 
                                      className="remove-btn"
                                      onClick={() => removeTestRide(ride._id)}
                                      disabled={ride.status === 'cancelled' || ride.status === 'completed'}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        )}
      </div>
      
      {/* Modal for changing settings */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>×</button>
            <h2>
              {modalType === 'password' ? 'Change Password' : 
               `Update ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
            </h2>
            
            {modalType === 'password' ? (
              <div className="password-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter your current password"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter your new password"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="modalValue">
                  {modalType === 'name' && 'Full Name'}
                  {modalType === 'email' && 'Email Address'}
                  {modalType === 'phone' && 'Mobile Number'}
                </label>
                <input
                  type={modalType === 'email' ? 'email' : modalType === 'phone' ? 'tel' : 'text'}
                  id="modalValue"
                  value={modalValue}
                  onChange={(e) => setModalValue(e.target.value)}
                  placeholder={
                    modalType === 'name' ? 'Enter your full name' :
                    modalType === 'email' ? 'Enter your email address' :
                    'Enter your 10-digit mobile number'
                  }
                />
              </div>
            )}
            
            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              <button 
                className="save-btn" 
                onClick={handleModalSave}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;