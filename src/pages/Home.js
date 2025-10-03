import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import vehiclesData from '../data/vehicles';
import { useFavorites } from '../contexts/FavoritesContext';
import './Home.css';

const Home = () => {
  // Filter motorcycles only
  const motorcycles = vehiclesData.filter(vehicle => vehicle.type === 'Motorcycle');
  
  // Split motorcycles to have more bikes in first row and add one more to second row
  const firstMotorcycleRow = motorcycles.slice(0, Math.ceil(motorcycles.length / 2) + 1);
  const secondMotorcycleRow = motorcycles.slice(Math.ceil(motorcycles.length / 2) + 1);
  
  // Filter scooters
  const scooters = vehiclesData.filter(vehicle => vehicle.type === 'Scooter' || vehicle.type === 'Electric Scooter');
  
  // Split scooters into four rows
  const firstScooterRow = scooters.slice(0, 10);
  const secondScooterRow = scooters.slice(10, 20);
  const thirdScooterRow = scooters.slice(20, 30);
  const fourthScooterRow = scooters.slice(30);
  
  // Filter electric vehicles
  const electricVehicles = vehiclesData.filter(vehicle => vehicle.type === 'Electric Scooter');
  
  // Split electric vehicles into two rows
  const firstElectricRow = electricVehicles.slice(0, Math.ceil(electricVehicles.length / 2));
  const secondElectricRow = electricVehicles.slice(Math.ceil(electricVehicles.length / 2));
  
  // Get favorites from context
  const { favorites, fetchFavorites } = useFavorites();

  // Fetch favorites when component mounts
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Function to render vehicle cards in Netflix style
  const renderVehicleCard = (vehicle) => (
    <div key={vehicle.id || vehicle.vehicleId} className="netflix-card">
      <div className="netflix-card-image">
        <img src={vehicle.image || vehicle.vehicleImage} alt={vehicle.name || vehicle.vehicleName} />
      </div>
      <div className="netflix-card-info">
        <h3>{vehicle.name || vehicle.vehicleName}</h3>
        <p className="brand">{vehicle.brand || vehicle.vehicleBrand}</p>
        <p className="price">₹{(vehicle.price || vehicle.vehiclePrice).toLocaleString()}</p>
        <div className="rating">
          <span className="stars">★★★★☆</span>
          <span className="rating-value">4.2</span>
        </div>
        <Link to={`/vehicle/${vehicle.id || vehicle.vehicleId}`} className="view-details-btn">View Details</Link>
      </div>
    </div>
  );

  // Convert backend favorites to the format expected by renderVehicleCard
  const favoriteVehicles = favorites.map(fav => ({
    id: fav.vehicleId,
    name: fav.vehicleName,
    brand: fav.vehicleBrand,
    price: fav.vehiclePrice,
    image: fav.vehicleImage
  }));

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find Your Perfect Two-Wheeler at Two Wheeler Pro</h1>
            <p className="hero-subtitle">Discover the best two-wheelers from leading brands. Compare models, read reviews, and find the perfect ride for your lifestyle.</p>
          </div>
        </div>
      </section>

      {/* MotorBikes Category */}
      <section className="category-section">
        <div className="container">
          <h2 className="category-title stylish-title">MotorBikes</h2>
          <div className="netflix-row">
            {firstMotorcycleRow.map(renderVehicleCard)}
          </div>
          <div className="netflix-row">
            {secondMotorcycleRow.map(renderVehicleCard)}
          </div>
        </div>
      </section>
      
      {/* Scooters Category */}
      <section className="category-section">
        <div className="container">
          <h2 className="category-title stylish-title">Scooters</h2>
          <div className="netflix-row">
            {firstScooterRow.map(renderVehicleCard)}
          </div>
          <div className="netflix-row">
            {secondScooterRow.map(renderVehicleCard)}
          </div>
          <div className="netflix-row">
            {thirdScooterRow.map(renderVehicleCard)}
          </div>
          <div className="netflix-row">
            {fourthScooterRow.map(renderVehicleCard)}
          </div>
        </div>
      </section>
      
      {/* Electric Vehicles Category */}
      <section className="category-section">
        <div className="container">
          <h2 className="category-title stylish-title">Electric Vehicles</h2>
          <div className="netflix-row">
            {firstElectricRow.map(renderVehicleCard)}
          </div>
          <div className="netflix-row">
            {secondElectricRow.map(renderVehicleCard)}
          </div>
        </div>
      </section>
      
      {/* Favorites Section */}
      <section className="category-section">
        <div className="container">
          <h2 className="category-title stylish-title">Favorites</h2>
          {favoriteVehicles.length > 0 ? (
            <div className="netflix-row">
              {favoriteVehicles.map(renderVehicleCard)}
            </div>
          ) : (
            <div className="empty-favorites">
              <p>No favorite vehicles yet. Start adding vehicles to your favorites!</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Test Ride Section */}
      <section className="test-ride-section">
        <div className="container">
          <div className="test-ride-content">
            <div className="test-ride-info">
              <h2>Experience Your Dream Ride</h2>
              <p>Book a test ride today and feel the power, comfort, and performance of your favorite two-wheeler before you buy.</p>
              
              <div className="test-ride-benefits">
                <div className="benefit-card">
                  <span className="benefit-icon">🏍️</span>
                  <h3>Real Road Experience</h3>
                  <p>Test the vehicle on actual roads with our expert guidance</p>
                </div>
                
                <div className="benefit-card">
                  <span className="benefit-icon">💰</span>
                  <h3>No Obligation</h3>
                  <p>Experience without any commitment to purchase</p>
                </div>
                
                <div className="benefit-card">
                  <span className="benefit-icon">🏆</span>
                  <h3>Expert Assistance</h3>
                  <p>Get detailed insights from our certified professionals</p>
                </div>
              </div>
              
              <Link to="/test-ride" className="btn btn-primary test-ride-btn">
                Book a Test Ride Now
              </Link>
            </div>
            
            <div className="test-ride-image">
              <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1950&q=80" alt="Test Ride Experience" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Professional Feedback/Suggestions Section */}
      <section className="feedback-section">
        <div className="container">
          <div className="feedback-header">
            <h2 className="feedback-title">Customer Feedback</h2>
            <p className="feedback-subtitle">Help us improve your experience at Two Wheeler Pro</p>
          </div>
          
          <div className="feedback-content">
            <div className="feedback-info">
              <h3>Share Your Thoughts</h3>
              <p>Your feedback helps us enhance our services and provide you with the best two-wheeler shopping experience.</p>
              
              <div className="feedback-benefits">
                <div className="benefit-card">
                  <span className="benefit-icon">💡</span>
                  <h4>Product Suggestions</h4>
                  <p>Tell us which vehicles you'd like to see on our platform</p>
                </div>
                
                <div className="benefit-card">
                  <span className="benefit-icon">🛠️</span>
                  <h4>Service Improvements</h4>
                  <p>Share your experience to help us enhance our services</p>
                </div>
                
                <div className="benefit-card">
                  <span className="benefit-icon">🏆</span>
                  <h4>Win Exciting Prizes</h4>
                  <p>Participate in our monthly feedback program for a chance to win exciting rewards</p>
                </div>
              </div>
              
              <Link to="/contact" className="btn btn-primary feedback-btn">
                Share Your Feedback
              </Link>
            </div>
            
            <div className="feedback-stats">
              <div className="stat-card">
                <h3>10,000+</h3>
                <p>Happy Customers</p>
              </div>
              
              <div className="stat-card">
                <h3>98%</h3>
                <p>Satisfaction Rate</p>
              </div>
              
              <div className="stat-card">
                <h3>500+</h3>
                <p>Feedbacks Received</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;