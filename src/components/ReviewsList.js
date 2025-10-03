import React from 'react';
import './ReviewsList.css';

const ReviewsList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="reviews-list-container">
        <h3>Reviews</h3>
        <p className="no-reviews">No reviews yet. Be the first to review this vehicle!</p>
      </div>
    );
  }

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="reviews-list-container">
      <div className="reviews-header">
        <h3>Reviews</h3>
        <div className="average-rating">
          <span className="rating-value">{averageRating.toFixed(1)}</span>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star} 
                className={`star ${star <= Math.round(averageRating) ? 'filled' : ''}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="review-count">({reviews.length} reviews)</span>
        </div>
      </div>
      
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="reviewer-info">
                <span className="reviewer-name">{review.userName}</span>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className={`star ${star <= review.rating ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <span className="review-date">{review.date}</span>
            </div>
            <h4 className="review-title">{review.title}</h4>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;