import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import vehiclesData from '../data/vehicles';
import { useUser } from '../contexts/UserContext';
import './Recommendations.css';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useUser();

  // Generate recommendations based on user favorites
  useEffect(() => {
    // For all users, show popular vehicles
    const popularVehicles = [...vehiclesData]
      .sort((a, b) => b.price - a.price) // Sort by price as a proxy for popularity
      .slice(0, 4);
    setRecommendations(popularVehicles);
  }, [user]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="recommendations-section">
      <div className="container">
        <h2>{user ? 'Recommended for You' : 'Popular Vehicles'}</h2>
        <div className="vehicles-grid">
          {recommendations.map(vehicle => (
            <div key={vehicle.id} className="vehicle-card">
              <div className="vehicle-image">
                <img src={vehicle.image} alt={vehicle.name} />
              </div>
              <div className="vehicle-info">
                <h3>{vehicle.name}</h3>
                <p className="brand">{vehicle.brand}</p>
                <p className="price">₹{vehicle.price.toLocaleString()}</p>
                <Link to={`/vehicle/${vehicle.id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;