import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import vehiclesData from '../data/vehicles';
import Recommendations from '../components/Recommendations';
import './VehicleList.css';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [fuelTypeFilter, setFuelTypeFilter] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [mileageFilter, setMileageFilter] = useState('');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setVehicles(vehiclesData);
    setFilteredVehicles(vehiclesData);
    
    // Check for search parameter from URL
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  // Extract unique values for filters
  const brands = [...new Set(vehicles.map(vehicle => vehicle.brand))];
  const types = [...new Set(vehicles.map(vehicle => vehicle.type))];
  const fuelTypes = [...new Set(vehicles.map(vehicle => vehicle.fuelType))];
  
  // Extract mileage values and create ranges
  const mileageValues = vehicles
    .filter(vehicle => vehicle.specs.mileage)
    .map(vehicle => {
      const mileageStr = vehicle.specs.mileage;
      const mileageNum = parseFloat(mileageStr);
      return isNaN(mileageNum) ? 0 : mileageNum;
    })
    .filter(mileage => mileage > 0);
  
  const maxMileage = Math.max(...mileageValues, 0);

  useEffect(() => {
    let filtered = vehicles;

    if (searchTerm) {
      filtered = filtered.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (brandFilter) {
      filtered = filtered.filter(vehicle => vehicle.brand === brandFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter(vehicle => vehicle.type === typeFilter);
    }

    if (fuelTypeFilter) {
      filtered = filtered.filter(vehicle => vehicle.fuelType === fuelTypeFilter);
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(vehicle => vehicle.price >= min && vehicle.price <= max);
      } else {
        filtered = filtered.filter(vehicle => vehicle.price >= min);
      }
    }

    if (mileageFilter) {
      const [minMileage, maxMileage] = mileageFilter.split('-').map(Number);
      filtered = filtered.filter(vehicle => {
        if (!vehicle.specs.mileage) return false;
        const mileageStr = vehicle.specs.mileage;
        const mileageNum = parseFloat(mileageStr);
        if (isNaN(mileageNum)) return false;
        
        if (maxMileage) {
          return mileageNum >= minMileage && mileageNum <= maxMileage;
        } else {
          return mileageNum >= minMileage;
        }
      });
    }

    setFilteredVehicles(filtered);
  }, [searchTerm, brandFilter, typeFilter, fuelTypeFilter, priceRange, mileageFilter, vehicles]);

  // Group vehicles by type
  const groupVehiclesByType = (vehicles) => {
    return vehicles.reduce((groups, vehicle) => {
      const type = vehicle.type;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(vehicle);
      return groups;
    }, {});
  };

  const groupedVehicles = groupVehiclesByType(filteredVehicles);

  const handleSearch = (e) => {
    e.preventDefault();
    // The search is handled by the useEffect above
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setBrandFilter('');
    setTypeFilter('');
    setFuelTypeFilter('');
    setPriceRange('');
    setMileageFilter('');
  };

  return (
    <div className="vehicle-list">
      <div className="container">
        <h1>Browse Our Premium Collection</h1>
        
        {/* Filters Section */}
        <div className="filters">
          <h2>Find Your Perfect Ride</h2>
          <div className="filter-options">
            <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select value={fuelTypeFilter} onChange={(e) => setFuelTypeFilter(e.target.value)}>
              <option value="">All Fuel Types</option>
              {fuelTypes.map(fuelType => (
                <option key={fuelType} value={fuelType}>{fuelType}</option>
              ))}
            </select>
            
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="">All Prices</option>
              <option value="0-50000">Below ₹50,000</option>
              <option value="50000-100000">₹50,000 - ₹1,00,000</option>
              <option value="100000-150000">₹1,00,000 - ₹1,50,000</option>
              <option value="150000">Above ₹1,50,000</option>
            </select>
            
            <select value={mileageFilter} onChange={(e) => setMileageFilter(e.target.value)}>
              <option value="">All Mileage</option>
              <option value="0-30">Below 30 kmpl</option>
              <option value="30-50">30 - 50 kmpl</option>
              <option value="50-70">50 - 70 kmpl</option>
              <option value="70">Above 70 kmpl</option>
            </select>
          </div>
          
          {/* Clear Filters Button */}
          {(searchTerm || brandFilter || typeFilter || fuelTypeFilter || priceRange || mileageFilter) && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button 
                onClick={clearFilters}
                className="btn btn-primary"
                style={{ 
                  background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                  padding: '0.6rem 1.2rem',
                  fontSize: '0.9rem',
                  width: 'auto',
                  display: 'inline-block'
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
        
        {/* Vehicle Grid by Type */}
        {Object.keys(groupedVehicles).length > 0 ? (
          Object.entries(groupedVehicles).map(([type, vehicles]) => (
            <div key={type} className="vehicle-type-section">
              <h2>{type}s</h2>
              <div className="vehicle-grid">
                {vehicles.map(vehicle => (
                  <div key={vehicle.id} className="vehicle-card">
                    <div className="vehicle-image">
                      <img src={vehicle.image} alt={vehicle.name} />
                      {vehicle.type === 'Electric Scooter' && (
                        <span className="vehicle-badge">Electric</span>
                      )}
                    </div>
                    <div className="vehicle-info">
                      <h3>{vehicle.name}</h3>
                      <p className="brand">{vehicle.brand}</p>
                      <p className="price">₹{vehicle.price.toLocaleString()}</p>
                      <div className="specs">
                        <span className="spec">{vehicle.fuelType}</span>
                        {vehicle.specs.mileage && (
                          <span className="spec">{vehicle.specs.mileage}</span>
                        )}
                        {vehicle.specs.engine && (
                          <span className="spec">{vehicle.specs.engine}</span>
                        )}
                        {vehicle.specs.motor && (
                          <span className="spec">{vehicle.specs.motor}</span>
                        )}
                      </div>
                      <div className="vehicle-actions">
                        <Link to={`/vehicle/${vehicle.id}`} className="btn btn-primary">View Details</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No vehicles found matching your criteria.</p>
            <p>Try adjusting your filters or search terms.</p>
            <button 
              onClick={clearFilters}
              className="btn btn-primary"
              style={{ 
                marginTop: '1rem',
                background: 'linear-gradient(135deg, #3498db, #2980b9)',
                padding: '0.8rem 1.5rem',
                fontSize: '1rem',
                width: 'auto',
                display: 'inline-block'
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Recommendations Section */}
      <Recommendations />
    </div>
  );
};

export default VehicleList;