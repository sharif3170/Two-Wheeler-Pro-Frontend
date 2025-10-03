import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useReviews } from '../contexts/ReviewsContext';
import axios from 'axios';
import './ReviewForm.css';

const ReviewForm = ({ vehicleId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useUser();
  const { addReview } = useReviews();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Please log in to submit a review');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a title for your review');
      return;
    }

    if (!comment.trim()) {
      setError('Please enter your review comment');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send review to backend
      const reviewData = {
        vehicleId: parseInt(vehicleId),
        rating: parseInt(rating),
        title,
        comment
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/reviews`,
        reviewData,
        {
          headers: {
            'Content-Type': 'application/json',
            'user-id': user._id
          }
        }
      );

      // Add review to local context
      addReview(reviewData, user._id);
      
      // Reset form
      setRating(5);
      setTitle('');
      setComment('');
      
      // Notify parent component
      if (onReviewAdded) {
        onReviewAdded();
      }
      
      // Show success message
      alert('Review submitted successfully!');
    } catch (err) {
      console.error('Error submitting review:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Error: ${err.response.data.message}`);
      } else {
        setError('Failed to submit review. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="review-form-container">
        <p>Please log in to submit a review.</p>
      </div>
    );
  }

  return (
    <div className="review-form-container">
      <h3>Write a Review</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating:</label>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'filled' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your review a title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="comment">Review:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this vehicle"
            rows="4"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;