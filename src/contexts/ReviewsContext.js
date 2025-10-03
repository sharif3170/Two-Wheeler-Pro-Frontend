import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  // Load reviews from backend on initial load
  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      // In a real app, you would fetch reviews from the backend
      // For now, we'll keep the localStorage approach for simplicity
      const savedReviews = localStorage.getItem('reviews');
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const addReview = async (reviewData, userId) => {
    try {
      // In a real app, you would send this to the backend
      const newReview = {
        id: Date.now(),
        ...reviewData,
        date: new Date().toISOString().split('T')[0]
      };
      
      // For now, we'll keep the localStorage approach for simplicity
      setReviews([...reviews, newReview]);
      localStorage.setItem('reviews', JSON.stringify([...reviews, newReview]));
      
      return newReview;
    } catch (err) {
      console.error('Error adding review:', err);
      throw err;
    }
  };

  const getReviewsForVehicle = (vehicleId) => {
    return reviews.filter(review => review.vehicleId === vehicleId);
  };

  const getUserReviewForVehicle = (userId, vehicleId) => {
    return reviews.find(review => review.userId === userId && review.vehicleId === vehicleId);
  };

  return (
    <ReviewsContext.Provider value={{
      reviews,
      addReview,
      getReviewsForVehicle,
      getUserReviewForVehicle
    }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};