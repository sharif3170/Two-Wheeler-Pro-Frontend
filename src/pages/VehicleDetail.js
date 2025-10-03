import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useReviews } from '../contexts/ReviewsContext';
import { useFavorites } from '../contexts/FavoritesContext';
import axios from 'axios';
import vehiclesData from '../data/vehicles';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewForm';
import './VehicleDetail.css';

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('specs'); // For tab navigation
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [favoriteMessage, setFavoriteMessage] = useState('');
  const { user } = useUser();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { getReviewsForVehicle } = useReviews(); // Destructure getReviewsForVehicle from useReviews

  useEffect(() => {
    const vehicleData = vehiclesData.find(v => v.id === parseInt(id));
    setVehicle(vehicleData);
    
    // Fetch reviews for this vehicle from backend
    fetchReviewsForVehicle(parseInt(id));
  }, [id]);

  const fetchReviewsForVehicle = async (vehicleId) => {
    setLoadingReviews(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/reviews/vehicle/${vehicleId}`
      );
      
      setReviews(response.data.reviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      // Fallback to local reviews if backend fails
      const localReviews = getReviewsForVehicle(vehicleId);
      setReviews(localReviews);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleReviewAdded = () => {
    // Refresh reviews
    fetchReviewsForVehicle(parseInt(id));
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      setFavoriteMessage('Please log in to add favorites');
      setTimeout(() => setFavoriteMessage(''), 3000);
      return;
    }
    
    if (vehicle) {
      await toggleFavorite(vehicle);
      // Update the message based on the new state
      const nowFavorited = !isFavorite(vehicle.id);
      setFavoriteMessage(nowFavorited ? 'Added to favorites' : 'Removed from favorites');
      setTimeout(() => setFavoriteMessage(''), 3000);
    }
  };

  if (!vehicle) {
    return <div className="container">Vehicle not found</div>;
  }

  const isFavorited = isFavorite(vehicle.id);

  // For image gallery, we'll use the same image for now but in a real app you would have multiple images
  const images = [vehicle.image, vehicle.image, vehicle.image]; // Using same image for demo

  return (
    <div className="vehicle-detail">
      <div className="container">
        <Link to="/vehicles" className="back-link">&larr; Back to vehicles</Link>
        
        <div className="vehicle-header">
          <div className="vehicle-title-section">
            <h1>{vehicle.name}</h1>
            <div className="vehicle-meta">
              <span className="brand">{vehicle.brand}</span>
              <span className="price">₹{vehicle.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Favorite message */}
        {favoriteMessage && (
          <div className={`alert ${favoriteMessage.includes('Please log in') ? 'alert-warning' : 'alert-success'}`}>
            {favoriteMessage}
          </div>
        )}
        
        <div className="vehicle-content">
          {/* Image Gallery */}
          <div className="image-gallery">
            <div className="main-image">
              <img src={images[selectedImage]} alt={vehicle.name} />
            </div>
            <div className="thumbnail-gallery">
              {images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${vehicle.name} ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
            
            {/* Add to Favorites Button */}
            <div className="favorites-section">
              <button 
                className={`btn-favorite ${isFavorited ? 'favorited' : ''}`}
                onClick={handleToggleFavorite}
              >
                <i className={`fas ${isFavorited ? 'fa-heart' : 'fa-heart'}`}></i>
                {isFavorited ? ' REMOVE FROM FAVORITES' : ' ADD TO FAVORITES'}
              </button>
            </div>
          </div>
          
          {/* Vehicle Information */}
          <div className="vehicle-info">
            <div className="info-tabs">
              <button 
                className={activeTab === 'specs' ? 'active' : ''}
                onClick={() => setActiveTab('specs')}
              >
                Specifications
              </button>
              <button 
                className={activeTab === 'features' ? 'active' : ''}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
              <button 
                className={activeTab === 'description' ? 'active' : ''}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'specs' && (
                <div className="specs-content">
                  <h3>Technical Specifications</h3>
                  <table>
                    <tbody>
                      {Object.entries(vehicle.specs).map(([key, value]) => (
                        <tr key={key}>
                          <td>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'features' && (
                <div className="features-content">
                  <h3>Key Features</h3>
                  <ul>
                    <li>Advanced engine technology for better performance</li>
                    <li>Comfortable seating for long rides</li>
                    <li>Stylish design that turns heads</li>
                    <li>Excellent fuel efficiency</li>
                    <li>Reliable braking system for safety</li>
                    <li>Modern digital dashboard</li>
                    <li>LED lighting for better visibility</li>
                    <li>Ergonomic handlebar design</li>
                  </ul>
                </div>
              )}
              
              {activeTab === 'description' && (
                <div className="description-content">
                  <h3>About {vehicle.name}</h3>
                  <p>
                    The {vehicle.name} is a popular {vehicle.type.toLowerCase()} known for its reliability and performance. 
                    With its {vehicle.fuelType.toLowerCase()} engine, it offers excellent mileage and a comfortable riding experience.
                  </p>
                  <p>
                    Designed for both city commuting and long-distance travel, this vehicle combines style, comfort, and efficiency. 
                    Its advanced engineering ensures a smooth ride while delivering impressive fuel economy.
                  </p>
                </div>
              )}
            </div>
            
            <div className="actions">
              <Link to={`/test-ride?vehicleId=${vehicle.id}`} className="btn btn-primary">Book Test Ride</Link>
            </div>
          </div>
        </div>
        
        {/* Professional Section */}
        <div className="section professional-section">
          <h2>Why Choose {vehicle.name}?</h2>
          <div className="professional-content">
            <div className="professional-item">
              <div className="professional-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="professional-text">
                <h3>Reliability Guaranteed</h3>
                <p>Built with premium materials and rigorous quality testing to ensure long-lasting performance.</p>
              </div>
            </div>
            
            <div className="professional-item">
              <div className="professional-icon">
                <i className="fas fa-gas-pump"></i>
              </div>
              <div className="professional-text">
                <h3>Fuel Efficiency</h3>
                <p>Advanced engine technology delivers exceptional mileage for cost-effective riding.</p>
              </div>
            </div>
            
            <div className="professional-item">
              <div className="professional-icon">
                <i className="fas fa-tools"></i>
              </div>
              <div className="professional-text">
                <h3>Low Maintenance</h3>
                <p>Designed for easy servicing with wide service network availability across India.</p>
              </div>
            </div>
            
            <div className="professional-item">
              <div className="professional-icon">
                <i className="fas fa-award"></i>
              </div>
              <div className="professional-text">
                <h3>Trusted Brand</h3>
                <p>With years of excellence in the two-wheeler industry, {vehicle.brand} is a name you can trust.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="section">
          <h2>Customer Reviews</h2>
          {loadingReviews ? (
            <p>Loading reviews...</p>
          ) : (
            <>
              <ReviewsList reviews={reviews} />
              <ReviewForm vehicleId={vehicle.id} onReviewAdded={handleReviewAdded} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;