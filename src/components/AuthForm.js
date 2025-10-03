import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from 'axios'; // Import axios directly
import './AuthForm.css';

const AuthForm = ({ onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup } = useUser();

  // Update mode when initialMode changes (in case it's needed)
  React.useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
        return '';
      case 'phone':
        if (!isLogin && !value) return 'Phone number is required';
        if (value && !/^\d{10}$/.test(value)) return 'Phone must be 10 digits';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return '';
      case 'confirmPassword':
        if (!isLogin && !value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let fieldsToValidate;
    
    if (isLogin) {
      fieldsToValidate = ['email', 'password'];
    } else {
      fieldsToValidate = ['name', 'email', 'phone', 'password', 'confirmPassword'];
    }
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        // Make actual API call to login using environment variable
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        
        // Handle successful login
        const userData = response.data.user;
        login(userData);
      } else {
        // Make actual API call to register using environment variable
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password
        });
        
        // Handle successful signup
        const userData = response.data.user;
        signup(userData);
      }
      
      if (onClose) onClose();
    } catch (err) {
      // Handle API errors
      const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="auth-form-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="auth-subtitle">
          {isLogin 
            ? 'Sign in to access your account' 
            : 'Join us for personalized recommendations'}
        </p>
        
        {errors.general && <div className="error-message">{errors.general}</div>}
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name && touched.name ? 'error' : ''}
                placeholder="Enter your full name"
              />
              {errors.name && touched.name && (
                <div className="field-error">{errors.name}</div>
              )}
            </div>
          )}
          
          <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <div className="field-error">{errors.email}</div>
              )}
            </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.phone && touched.phone ? 'error' : ''}
                placeholder="10-digit phone number"
              />
              {errors.phone && touched.phone && (
                <div className="field-error">{errors.phone}</div>
              )}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? 'error' : ''}
              placeholder="Create a password"
            />
            {errors.password && touched.password && (
              <div className="field-error">{errors.password}</div>
            )}
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="field-error">{errors.confirmPassword}</div>
              )}
            </div>
          )}
          
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : isLogin ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        
        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setTouched({});
              }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
        
        {!isLogin && (
          <p className="terms">
            By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;