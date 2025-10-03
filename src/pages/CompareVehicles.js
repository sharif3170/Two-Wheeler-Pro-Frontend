import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import vehiclesData from '../data/vehicles';
import './CompareVehicles.css';

const CompareVehicles = () => {
  const [selectedVehicles, setSelectedVehicles] = useState([null, null]);
  const [comparisonData, setComparisonData] = useState(null);

  const handleVehicleSelect = (index, vehicleId) => {
    const updatedSelection = [...selectedVehicles];
    updatedSelection[index] = vehicleId ? parseInt(vehicleId) : null;
    setSelectedVehicles(updatedSelection);
  };

  const compareVehicles = () => {
    if (selectedVehicles[0] && selectedVehicles[1]) {
      const vehicle1 = vehiclesData.find(v => v.id === selectedVehicles[0]);
      const vehicle2 = vehiclesData.find(v => v.id === selectedVehicles[1]);
      setComparisonData([vehicle1, vehicle2]);
    } else {
      setComparisonData(null);
    }
  };

  return (
    <div className="compare-vehicles">
      <div className="container">
        <h1>Compare Two Wheelers</h1>
        
        <div className="selection-area">
          <div className="vehicle-selector">
            <select 
              value={selectedVehicles[0] || ''} 
              onChange={(e) => handleVehicleSelect(0, e.target.value)}
            >
              <option value="">Select first vehicle</option>
              {vehiclesData.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} ({vehicle.brand})
                </option>
              ))}
            </select>
          </div>
          
          <div className="vehicle-selector">
            <select 
              value={selectedVehicles[1] || ''} 
              onChange={(e) => handleVehicleSelect(1, e.target.value)}
            >
              <option value="">Select second vehicle</option>
              {vehiclesData.map(vehicle => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} ({vehicle.brand})
                </option>
              ))}
            </select>
          </div>
          
          <button 
            className="btn btn-primary" 
            onClick={compareVehicles}
            disabled={!selectedVehicles[0] || !selectedVehicles[1]}
          >
            Compare Vehicles
          </button>
        </div>
        
        {comparisonData && (
          <div className="comparison-results">
            <h2>Comparison Results</h2>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Specification</th>
                  <th>{comparisonData[0].name}</th>
                  <th>{comparisonData[1].name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td>{comparisonData[0].brand}</td>
                  <td>{comparisonData[1].brand}</td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>₹{comparisonData[0].price.toLocaleString()}</td>
                  <td>₹{comparisonData[1].price.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td>{comparisonData[0].type}</td>
                  <td>{comparisonData[1].type}</td>
                </tr>
                <tr>
                  <td>Fuel Type</td>
                  <td>{comparisonData[0].fuelType}</td>
                  <td>{comparisonData[1].fuelType}</td>
                </tr>
                {Object.keys(comparisonData[0].specs).map(key => (
                  <tr key={key}>
                    <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td>{comparisonData[0].specs[key]}</td>
                    <td>{comparisonData[1].specs[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="comparison-actions">
              <Link to={`/vehicle/${comparisonData[0].id}`} className="btn btn-secondary">
                View {comparisonData[0].name}
              </Link>
              <Link to={`/vehicle/${comparisonData[1].id}`} className="btn btn-secondary">
                View {comparisonData[1].name}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareVehicles;