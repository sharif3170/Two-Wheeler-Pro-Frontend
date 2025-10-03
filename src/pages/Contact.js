import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    feedbackType: 'suggestion'
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const feedbackData = {
        ...formData,
        userId: user?._id || null
      };
      
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/feedback/submit`,
        feedbackData,
        {
          headers: {
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
            subject: '',
            message: '',
            feedbackType: 'suggestion'
          });
        }, 5000);
      } else {
        setError(response.data.message || 'Failed to submit feedback');
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to submit feedback. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>We Value Your Feedback</h1>
          <p>Help us improve your experience at Two Wheeler Pro</p>
        </div>
        
        {isSubmitted ? (
          <div className="success-message">
            <h2>Thank You for Your Feedback! 🎉</h2>
            <p>We appreciate you taking the time to share your thoughts with us.</p>
            <p>Our team will review your feedback and get back to you if needed.</p>
          </div>
        ) : (
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Have questions or need assistance? Our team is here to help!</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <h3>📧 Email</h3>
                  <p>support@twowheelerpro.com</p>
                </div>
                
                <div className="contact-item">
                  <h3>📞 Phone</h3>
                  <p>+91 98765 43210</p>
                </div>
                
                <div className="contact-item">
                  <h3>🏢 Office</h3>
                  <p>123 Two Wheeler Street<br />Mumbai, Maharashtra 400001</p>
                </div>
                
                <div className="contact-item">
                  <h3>🕒 Business Hours</h3>
                  <p>Monday - Saturday: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            <div className="feedback-form">
              <div className="feedback-header">
                <h2 className="feedback-title">Contact Us</h2>
                <p>Help us improve your experience at Two Wheeler Pro</p>
              </div>
              {error && <div className="error-message">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your 10-digit phone number"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="feedbackType">Feedback Type</label>
                    <select
                      id="feedbackType"
                      name="feedbackType"
                      value={formData.feedbackType}
                      onChange={handleChange}
                    >
                      <option value="suggestion">Product Suggestion</option>
                      <option value="complaint">Service Complaint</option>
                      <option value="praise">Praise</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief subject of your feedback"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please share your detailed feedback, suggestions, or concerns..."
                    rows="6"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;