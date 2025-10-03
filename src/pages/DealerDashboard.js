import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import vehiclesData from '../data/vehicles';
import './DealerDashboard.css';

const DealerDashboard = () => {
  const { user } = useUser();
  const [vehicles, setVehicles] = useState(vehiclesData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    type: 'Motorcycle',
    fuelType: 'Petrol',
    price: '',
    image: '',
    specs: {
      engine: '',
      power: '',
      mileage: '',
      weight: '',
      fuelTank: ''
    }
  });

  // Check if user is a dealer (in a real app, this would come from user data)
  const isDealer = user && user.email.includes('dealer');

  if (!user) {
    return (
      <div className="container">
        <h1>Dealer Dashboard</h1>
        <p>Please log in to access the dealer dashboard.</p>
      </div>
    );
  }

  if (!isDealer) {
    return (
      <div className="container">
        <h1>Dealer Dashboard</h1>
        <p>You don't have permission to access the dealer dashboard. This section is for authorized dealers only.</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('specs.')) {
      const specKey = name.split('.')[1];
      setFormData({
        ...formData,
        specs: {
          ...formData.specs,
          [specKey]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const vehicleData = {
      ...formData,
      id: editingVehicle ? editingVehicle.id : Date.now(),
      price: parseFloat(formData.price)
    };

    if (editingVehicle) {
      // Update existing vehicle
      setVehicles(vehicles.map(v => v.id === editingVehicle.id ? vehicleData : v));
    } else {
      // Add new vehicle
      setVehicles([...vehicles, vehicleData]);
    }

    // Reset form
    setFormData({
      name: '',
      brand: '',
      type: 'Motorcycle',
      fuelType: 'Petrol',
      price: '',
      image: '',
      specs: {
        engine: '',
        power: '',
        mileage: '',
        weight: '',
        fuelTank: ''
      }
    });
    setEditingVehicle(null);
    setShowAddForm(false);
  };

  const handleEdit = (vehicle) => {
    setFormData({
      name: vehicle.name,
      brand: vehicle.brand,
      type: vehicle.type,
      fuelType: vehicle.fuelType,
      price: vehicle.price.toString(),
      image: vehicle.image,
      specs: { ...vehicle.specs }
    });
    setEditingVehicle(vehicle);
    setShowAddForm(true);
  };

  const handleDelete = (vehicleId) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(v => v.id !== vehicleId));
    }
  };

  const cancelEdit = () => {
    setFormData({
      name: '',
      brand: '',
      type: 'Motorcycle',
      fuelType: 'Petrol',
      price: '',
      image: '',
      specs: {
        engine: '',
        power: '',
        mileage: '',
        weight: '',
        fuelTank: ''
      }
    });
    setEditingVehicle(null);
    setShowAddForm(false);
  };

  return (
    <div className="dealer-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Dealer Dashboard</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : '+ Add Vehicle'}
          </button>
        </div>

        {showAddForm && (
          <div className="vehicle-form">
            <h2>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'} </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Vehicle Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="brand">Brand</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Electric Scooter">Electric Scooter</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="fuelType">Fuel Type</label>
                  <select
                    id="fuelType"
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price (₹)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <h3>Specifications</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="specs.engine">Engine</label>
                  <input
                    type="text"
                    id="specs.engine"
                    name="specs.engine"
                    value={formData.specs.engine}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="specs.power">Power</label>
                  <input
                    type="text"
                    id="specs.power"
                    name="specs.power"
                    value={formData.specs.power}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="specs.mileage">Mileage</label>
                  <input
                    type="text"
                    id="specs.mileage"
                    name="specs.mileage"
                    value={formData.specs.mileage}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="specs.weight">Weight</label>
                  <input
                    type="text"
                    id="specs.weight"
                    name="specs.weight"
                    value={formData.specs.weight}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="specs.fuelTank">Fuel Tank</label>
                  <input
                    type="text"
                    id="specs.fuelTank"
                    name="specs.fuelTank"
                    value={formData.specs.fuelTank}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="vehicles-list">
          <h2>Manage Vehicles</h2>
          {vehicles.length === 0 ? (
            <p>No vehicles listed yet.</p>
          ) : (
            <div className="vehicles-grid">
              {vehicles.map(vehicle => (
                <div key={vehicle.id} className="vehicle-card">
                  <div className="vehicle-image">
                    <img src={vehicle.image} alt={vehicle.name} />
                  </div>
                  <div className="vehicle-info">
                    <h3>{vehicle.name}</h3>
                    <p className="brand">{vehicle.brand}</p>
                    <p className="price">₹{vehicle.price.toLocaleString()}</p>
                    <div className="vehicle-actions">
                      <button 
                        className="btn btn-secondary"
                        onClick={() => handleEdit(vehicle)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealerDashboard;