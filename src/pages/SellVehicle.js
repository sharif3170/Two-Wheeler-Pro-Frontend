import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext'; // Import useUser
import './SellVehicle.css';

const SellVehicle = () => {
  const { user } = useUser(); // Get user from context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleBrand: '',
    vehicleModel: '',
    year: '',
    kmDriven: '',
    expectedPrice: '',
    condition: 'excellent',
    description: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email';
      case 'phone':
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value) ? '' : 'Phone must be 10 digits';
      case 'vehicleBrand':
        return value ? '' : 'Vehicle brand is required';
      case 'vehicleModel':
        return value ? '' : 'Vehicle model is required';
      case 'year':
        const year = parseInt(value);
        const currentYear = new Date().getFullYear();
        if (!value) return 'Year is required';
        if (isNaN(year)) return 'Year must be a number';
        if (year < 1990 || year > currentYear) return `Year must be between 1990 and ${currentYear}`;
        return '';
      case 'kmDriven':
        const km = parseInt(value);
        if (!value) return 'Kilometers driven is required';
        if (isNaN(km)) return 'Kilometers must be a number';
        if (km < 0) return 'Kilometers cannot be negative';
        return '';
      case 'expectedPrice':
        const price = parseInt(value);
        if (!value) return 'Expected price is required';
        if (isNaN(price)) return 'Price must be a number';
        if (price < 1000) return 'Price must be at least ₹1000';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Validate the field
    const error = validateField(name, value);
    if (error) {
      setFormErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submitting
    if (!validateForm()) {
      setError('Please fix the errors in the form');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Include userId in the submission if user is logged in
      const submissionData = {
        ...formData,
        userId: user ? user._id : null
      };
      
      console.log('Submitting data:', submissionData);
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/sell-vehicle/submit`,
        submissionData,
        {
          withCredentials: true // Add credentials for authentication
        }
      );
      
      console.log('Response:', response.data);
      
      if (response.data.success) {
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: user ? user.name : '',
            email: user ? user.email : '',
            phone: user ? user.phone : '',
            vehicleBrand: '',
            vehicleModel: '',
            year: '',
            kmDriven: '',
            expectedPrice: '',
            condition: 'excellent',
            description: ''
          });
          setFormErrors({});
        }, 3000);
      } else {
        setError(response.data.message || 'Failed to submit vehicle details');
      }
    } catch (err) {
      console.error('Error submitting vehicle for sale:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.statusText}`);
      } else if (err.request) {
        setError('Network error: Please check your connection and try again');
      } else {
        setError('Failed to submit vehicle details. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Mock bike brand data
  const vehicleBrands = [
    "Royal Enfield", "TVS", "Honda", "Yamaha", "Suzuki", "Bajaj", "KTM", 
    "Harley-Davidson", "Ducati", "BMW", "Okinawa", "Okaya", "Ather", "Okinawa iPraise+"
  ];

  return (
    <div className="sell-vehicle">
      <div className="container">
        <h1>Sell Your Vehicle</h1>
        <p>Get the best value for your used vehicle. Fill out the form below and we'll contact you with a quote.</p>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        
        {isSubmitted ? (
          <div className="success-message">
            <h2>Request Submitted!</h2>
            <p>Thank you for submitting your vehicle details. Our team will evaluate your vehicle and contact you with a quote within 24 hours.</p>
          </div>
        ) : (
          <div className="sell-vehicle-content">
            <div className="form-section">
              <form onSubmit={handleSubmit}>
                <h3>Personal Information</h3>
                
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={formErrors.name ? 'error' : ''}
                    required
                  />
                  {formErrors.name && <div className="field-error">{formErrors.name}</div>}
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={formErrors.email ? 'error' : ''}
                      required
                    />
                    {formErrors.email && <div className="field-error">{formErrors.email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={formErrors.phone ? 'error' : ''}
                      required
                    />
                    {formErrors.phone && <div className="field-error">{formErrors.phone}</div>}
                  </div>
                </div>
                
                <h3>Vehicle Details</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="vehicleBrand">Brand</label>
                    <select
                      id="vehicleBrand"
                      name="vehicleBrand"
                      value={formData.vehicleBrand}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={formErrors.vehicleBrand ? 'error' : ''}
                      required
                    >
                      <option value="">Select brand</option>
                      {vehicleBrands.map((brand, index) => (
                        <option key={index} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                    {formErrors.vehicleBrand && <div className="field-error">{formErrors.vehicleBrand}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="vehicleModel">Model</label>
                    <input
                      type="text"
                      id="vehicleModel"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={formErrors.vehicleModel ? 'error' : ''}
                      required
                    />
                    {formErrors.vehicleModel && <div className="field-error">{formErrors.vehicleModel}</div>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="year">Year of Purchase</label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={formErrors.year ? 'error' : ''}
                      min="1990"
                      max={new Date().getFullYear()}
                      required
                    />
                    {formErrors.year && <div className="field-error">{formErrors.year}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="kmDriven">Kilometers Driven</label>
                    <input
                      type="number"
                      id="kmDriven"
                      name="kmDriven"
                      value={formData.kmDriven}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={formErrors.kmDriven ? 'error' : ''}
                      min="0"
                      required
                    />
                    {formErrors.kmDriven && <div className="field-error">{formErrors.kmDriven}</div>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expectedPrice">Expected Price (₹)</label>
                    <input
                      type="number"
                      id="expectedPrice"
                      name="expectedPrice"
                      value={formData.expectedPrice}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={formErrors.expectedPrice ? 'error' : ''}
                      min="1000"
                      required
                    />
                    {formErrors.expectedPrice && <div className="field-error">{formErrors.expectedPrice}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="condition">Condition</label>
                    <select
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Additional Details</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Any additional information about your vehicle..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block"
                  disabled={isLoading}
                >
                  {isLoading ? 'Submitting...' : 'Submit for Evaluation'}
                </button>
              </form>
            </div>
            
            <div className="info-section">
              <h3>How It Works</h3>
              <div className="steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Submit Details</h4>
                    <p>Fill out the form with your vehicle's information</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Get Evaluation</h4>
                    <p>Our experts will evaluate your vehicle's condition</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Receive Quote</h4>
                    <p>We'll provide you with a fair market price</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Finalize Sale</h4>
                    <p>Complete the transaction at your convenience</p>
                  </div>
                </div>
              </div>
              
              <div className="benefits">
                <h3>Why Sell With Us?</h3>
                <ul>
                  <li>Best market price for your vehicle</li>
                  <li>Quick and hassle-free process</li>
                  <li>Professional evaluation by experts</li>
                  <li>Secure and transparent transactions</li>
                  <li>Doorstep pickup available</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellVehicle;