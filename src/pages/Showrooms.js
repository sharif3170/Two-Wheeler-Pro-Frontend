import React, { useState } from 'react';
import './Showrooms.css';

const Showrooms = () => {
  const [selectedCity, setSelectedCity] = useState('');
  
  // Mock showroom data
  const showrooms = [
    {
      id: 3,
      name: "Honda Showroom",
      brand: "Honda",
      city: "Mumbai",
      address: "789 Beach Road, Mumbai, Maharashtra",
      phone: "+91 9876543212",
      email: "mumbai@honda.com",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/honda-cb-125-hornet-standard1753264754935.jpg?q=80"
    },
    {
      id: 1,
      name: "Royal Enfield Showroom",
      brand: "Royal Enfield",
      city: "Mumbai",
      address: "123 Main Street, Mumbai, Maharashtra",
      phone: "+91 9876543210",
      email: "mumbai@royalenfield.com",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "TVS Showroom",
      brand: "TVS",
      city: "Delhi",
      address: "456 Park Avenue, Delhi",
      phone: "+91 9876543211",
      email: "delhi@tvs.com",
      image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      name: "Yamaha Showroom",
      brand: "Yamaha",
      city: "Bangalore",
      address: "101 MG Road, Bangalore, Karnataka",
      phone: "+91 9876543213",
      email: "bangalore@yamaha.com",
      image: "https://images.unsplash.com/photo-1558981001-792f6c0d5068?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      name: "Okinawa Showroom",
      brand: "Okinawa",
      city: "Delhi",
      address: "202 Connaught Place, Delhi",
      phone: "+91 9876543214",
      email: "delhi@okinawa.com",
      image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/okinawa-select-model-yellow-1689754629633.png?q=80"
    },
    {
      id: 6,
      name: "Okaya Showroom",
      brand: "Okaya",
      city: "Bangalore",
      address: "303 Brigade Road, Bangalore, Karnataka",
      phone: "+91 9876543215",
      email: "bangalore@okaya.com",
      image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/okaya-select-model-white-1663137837681.jpg?q=80"
    },
    // Adding 6 more showrooms
    {
      id: 7,
      name: "Bajaj Showroom",
      brand: "Bajaj",
      city: "Pune",
      address: "404 FC Road, Pune, Maharashtra",
      phone: "+91 9876543216",
      email: "pune@bajaj.com",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/bajaj-pulsar-n160-dual-channel-abs1725031145215.jpg?q=80"
    },
    {
      id: 8,
      name: "Suzuki Showroom",
      brand: "Suzuki",
      city: "Chennai",
      address: "505 T Nagar, Chennai, Tamil Nadu",
      phone: "+91 9876543217",
      email: "chennai@suzuki.com",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/suzuki-access-125-standard1738074352591.jpg?q=80"
    },
    {
      id: 9,
      name: "Hero Showroom",
      brand: "Hero",
      city: "Hyderabad",
      address: "606 Banjara Hills, Hyderabad, Telangana",
      phone: "+91 9876543218",
      email: "hyderabad@hero.com",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--drum-brake-obd-2b1744875559407.jpg?q=80"
    },
    {
      id: 10,
      name: "KTM Showroom",
      brand: "KTM",
      city: "Pune",
      address: "707 Koregaon Park, Pune, Maharashtra",
      phone: "+91 9876543219",
      email: "pune@ktm.com",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/ktm-duke-250-standard1728459958743.jpg?q=80"
    },
    {
      id: 11,
      name: "Harley-Davidson Showroom",
      brand: "Harley-Davidson",
      city: "Chennai",
      address: "808 Anna Salai, Chennai, Tamil Nadu",
      phone: "+91 9876543220",
      email: "chennai@harleydavidson.com",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/harleydavidson-fat-boy-standard1732626929069.jpg?q=80"
    },
    {
      id: 12,
      name: "Ola Showroom",
      brand: "Ola",
      city: "Hyderabad",
      address: "909 Jubilee Hills, Hyderabad, Telangana",
      phone: "+91 9876543221",
      email: "hyderabad@ola.com",
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/1/versions/--standard1732616161809.jpg?q=80"
    }
  ];

  // Get unique cities for filter dropdown
  const cities = [...new Set(showrooms.map(showroom => showroom.city))];

  // Filter showrooms based on selected city
  const filteredShowrooms = selectedCity 
    ? showrooms.filter(showroom => showroom.city === selectedCity)
    : showrooms;

  // Clear filters
  const clearFilters = () => {
    setSelectedCity('');
  };

  // Handle get directions
  const handleGetDirections = (showroom) => {
    // In a real app, this would open a map with directions
    alert(`Opening directions to ${showroom.name} at ${showroom.address}`);
  };

  return (
    <div className="showrooms">
      <div className="container">
        <h1>Find Showrooms Near You</h1>
        <p>Visit our authorized dealers and experience your favorite two-wheelers firsthand</p>
        
        <div className="filters">
          <h2>Filter by City</h2>
          <div className="filter-select">
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          {/* Clear Filters Button */}
          {selectedCity && (
            <div style={{ marginTop: '1.5rem' }}>
              <button 
                onClick={clearFilters}
                className="btn btn-primary"
                style={{ 
                  background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                  padding: '0.8rem 1.5rem',
                  fontSize: '1rem',
                  width: 'auto',
                  display: 'inline-block'
                }}
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
        
        <div className="showroom-grid">
          {filteredShowrooms.length > 0 ? (
            filteredShowrooms.map(showroom => (
              <div key={showroom.id} className="showroom-card">
                <img src={showroom.image} alt={showroom.name} />
                <span className="showroom-badge">{showroom.brand}</span>
                <div className="showroom-info">
                  <h3>{showroom.name}</h3>
                  <p className="brand">{showroom.brand}</p>
                  <p className="address">{showroom.address}</p>
                  <div className="contact-info">
                    <p>{showroom.phone}</p>
                    <p>{showroom.email}</p>
                  </div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleGetDirections(showroom)}
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem" }}>
              <h3>No Showrooms Found</h3>
              <p>No showrooms found in the selected city. Please try another city.</p>
              <button 
                onClick={clearFilters}
                className="btn btn-primary"
                style={{ 
                  marginTop: '1.5rem',
                  background: 'linear-gradient(135deg, #3498db, #2980b9)',
                  padding: '0.9rem 1.8rem',
                  fontSize: '1.1rem',
                  width: 'auto',
                  display: 'inline-block'
                }}
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Showrooms;