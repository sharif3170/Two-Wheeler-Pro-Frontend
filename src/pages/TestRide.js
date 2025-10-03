import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import vehiclesData from '../data/vehicles';
import './TestRide.css';

const TestRide = () => {
  const location = useLocation();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    date: '',
    time: '',
    showroom: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Parse query parameters and populate user data
  useEffect(() => {
    // Populate user data if available
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
    
    // Parse query parameters for vehicleId
    const queryParams = new URLSearchParams(location.search);
    const vehicleId = queryParams.get('vehicleId');
    
    if (vehicleId) {
      const vehicle = vehiclesData.find(v => v.id === parseInt(vehicleId));
      if (vehicle) {
        setFormData(prevData => ({
          ...prevData,
          vehicle: vehicleId
        }));
        setSelectedVehicle(vehicle);
      }
    }
  }, [location.search, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Update selected vehicle when vehicle is selected
    if (name === 'vehicle' && value) {
      const vehicle = vehiclesData.find(v => v.id === parseInt(value));
      setSelectedVehicle(vehicle);
    } else if (name === 'vehicle' && !value) {
      setSelectedVehicle(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Check if user is logged in
    if (!user) {
      setError('Please log in to book a test ride');
      setIsLoading(false);
      return;
    }
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || 
        !formData.vehicle || !formData.date || !formData.time || !formData.showroom) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    
    // Validate phone format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      setIsLoading(false);
      return;
    }
    
    try {
      const testRideData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        vehicleId: parseInt(formData.vehicle),
        date: formData.date,
        time: formData.time,
        showroom: formData.showroom
        // Remove userId from testRideData as it will be handled by the backend
      };
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/test-rides/book`,
        testRideData,
        {
          headers: {
            'user-id': user._id, // Add user ID header for authentication
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        setIsSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            vehicle: '',
            date: '',
            time: '',
            showroom: ''
          });
          setSelectedVehicle(null);
        }, 5000);
      } else {
        setError(response.data.message || 'Failed to book test ride');
      }
    } catch (err) {
      console.error('Error booking test ride:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response && err.response.status === 401) {
        setError('Authentication required. Please log in to book a test ride.');
      } else {
        setError('Failed to book test ride. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Mock showroom data with more details
  const showrooms = [
    { id: 1, name: "Mumbai Central Showroom", address: "123 Main Street, Mumbai, Maharashtra" },
    { id: 2, name: "Delhi Showroom", address: "456 Park Avenue, Delhi" },
    { id: 3, name: "Bangalore Showroom", address: "789 MG Road, Bangalore, Karnataka" },
    { id: 4, name: "Chennai Showroom", address: "101 Marina Beach Road, Chennai, Tamil Nadu" },
    { id: 5, name: "Kolkata Showroom", address: "202 Park Street, Kolkata, West Bengal" }
  ];

  // Set min date to today for the date picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="test-ride">
      <div className="container">
        <h1>Experience the Ride of Your Life</h1>
        <p>Schedule a personalized test ride for your favorite two-wheeler at your nearest showroom. Our experts will guide you through every feature and answer all your questions.</p>
        
        {isSubmitted ? (
          <div className="success-message">
            <h2>Booking Confirmed! 🎉</h2>
            <p>Thank you for booking a test ride. Our team will contact you shortly to confirm your appointment.</p>
            <p>We've sent a confirmation email to <strong>{formData.email}</strong></p>
            <Link to="/vehicles" className="btn btn-primary">Browse More Vehicles</Link>
          </div>
        ) : (
          <div className="test-ride-content">
            <div className="form-section">
              <h2>Book Your Test Ride</h2>
              {error && <div className="error-message">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your 10-digit phone number"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="vehicle">Select Vehicle *</label>
                  <select
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a vehicle</option>
                    {vehiclesData
                      .sort((a, b) => a.brand.localeCompare(b.brand))
                      .map(vehicle => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.brand} {vehicle.name}
                        </option>
                      ))}
                  </select>
                  
                  {selectedVehicle && (
                    <div className="vehicle-preview">
                      <img src={selectedVehicle.image} alt={selectedVehicle.name} />
                      <h4>{selectedVehicle.brand} {selectedVehicle.name}</h4>
                      <p>₹{selectedVehicle.price.toLocaleString()}</p>
                      <p>{selectedVehicle.type} • {selectedVehicle.fuelType}</p>
                    </div>
                  )}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Preferred Date *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={today}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="time">Preferred Time *</label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select time</option>
                      <option value="09:00">09:00 AM - 10:00 AM</option>
                      <option value="10:00">10:00 AM - 11:00 AM</option>
                      <option value="11:00">11:00 AM - 12:00 PM</option>
                      <option value="12:00">12:00 PM - 01:00 PM</option>
                      <option value="14:00">02:00 PM - 03:00 PM</option>
                      <option value="15:00">03:00 PM - 04:00 PM</option>
                      <option value="16:00">04:00 PM - 05:00 PM</option>
                      <option value="17:00">05:00 PM - 06:00 PM</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="showroom">Select Showroom *</label>
                  <select
                    id="showroom"
                    name="showroom"
                    value={formData.showroom}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a showroom</option>
                    {showrooms.map(showroom => (
                      <option key={showroom.id} value={showroom.id}>
                        {showroom.name}
                      </option>
                    ))}
                  </select>
                  {formData.showroom && (
                    <p className="form-help">
                      {showrooms.find(s => s.id === parseInt(formData.showroom))?.address}
                    </p>
                  )}
                </div>
                
                {/* Show login prompt if user is not logged in */}
                {!user && (
                  <div className="login-prompt">
                    <p>Please log in to book your test ride.</p>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block"
                  disabled={isLoading || !user} // Disable if loading or user not logged in
                >
                  {isLoading ? 'Booking...' : 'Confirm Test Ride Booking'}
                </button>
              </form>
            </div>
            
            <div className="info-section">
              <h3>Why Take a Test Ride?</h3>
              <ul>
                <li>Experience the vehicle's performance firsthand on our test track</li>
                <li>Check comfort and ergonomics for your riding style</li>
                <li>Evaluate advanced features and technology</li>
                <li>Get a feel for handling, braking, and acceleration</li>
                <li>Ask detailed questions to our certified experts</li>
                <li>Compare with other models side-by-side</li>
              </ul>
              
              <h3>What to Expect During Your Visit</h3>
              <p>
                During your test ride, you'll be accompanied by one of our experienced 
                staff members who will guide you through the vehicle's features and 
                answer any questions you may have. We'll provide a safety helmet and
                ensure all safety protocols are followed.
              </p>
              
              <div className="tips">
                <h4>Test Ride Preparation Tips</h4>
                <p>Bring your valid driving license for verification</p>
                <p>Wear comfortable clothing and closed-toe shoes</p>
                <p>Arrive 15 minutes early to complete paperwork</p>
                <p>Ask about financing options and ongoing offers</p>
                <p>Take your time to explore all features thoroughly</p>
              </div>
              
              <div className="additional-info">
                <h3>Need Assistance?</h3>
                <p>Contact our customer support team:</p>
                <p>📞 +91 98765 43210</p>
                <p>📧 testrides@vaahanbazar.com</p>
                <p>Our team is available Monday to Saturday, 9:00 AM to 6:00 PM</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestRide;