import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [activeTab, setActiveTab] = useState('emi');
  
  // EMI Calculator state
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTenure, setLoanTenure] = useState(12);
  const [emiResult, setEmiResult] = useState(null);
  
  // Fuel Cost Calculator state
  const [distance, setDistance] = useState(100);
  const [fuelPrice, setFuelPrice] = useState(100);
  const [mileage, setMileage] = useState(40);
  const [fuelCostResult, setFuelCostResult] = useState(null);

  // Calculate EMI
  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const tenure = loanTenure;
    
    const emi = (principal * rate * Math.pow(1 + rate, tenure)) / 
                (Math.pow(1 + rate, tenure) - 1);
    
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;
    
    setEmiResult({
      emi: emi.toFixed(0),
      totalPayment: totalPayment.toFixed(0),
      totalInterest: totalInterest.toFixed(0)
    });
  };

  // Calculate Fuel Cost
  const calculateFuelCost = () => {
    const fuelRequired = distance / mileage;
    const totalCost = fuelRequired * fuelPrice;
    
    setFuelCostResult({
      fuelRequired: fuelRequired.toFixed(2),
      totalCost: totalCost.toFixed(2)
    });
  };

  // Reset EMI calculator
  const resetEMI = () => {
    setLoanAmount(100000);
    setInterestRate(10);
    setLoanTenure(12);
    setEmiResult(null);
  };

  // Reset Fuel Cost calculator
  const resetFuelCost = () => {
    setDistance(100);
    setFuelPrice(100);
    setMileage(40);
    setFuelCostResult(null);
  };

  return (
    <div className="calculator">
      <div className="container">
        <h1>Financial Calculators</h1>
        
        <div className="tabs">
          <button 
            className={activeTab === 'emi' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('emi')}
          >
            EMI Calculator
          </button>
          <button 
            className={activeTab === 'fuel' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('fuel')}
          >
            Fuel Cost Calculator
          </button>
        </div>
        
        {activeTab === 'emi' && (
          <div className="calculator-content">
            <h2>EMI Calculator</h2>
            <p>Calculate your monthly loan payments for a two-wheeler</p>
            
            <div className="calculator-form">
              <div className="form-group">
                <label>Loan Amount (₹)</label>
                <input 
                  type="number" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  min="10000"
                  max="10000000"
                />
              </div>
              
              <div className="form-group">
                <label>Interest Rate (%)</label>
                <input 
                  type="number" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  min="1"
                  max="30"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label>Loan Tenure (months)</label>
                <input 
                  type="number" 
                  value={loanTenure} 
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  min="1"
                  max="84"
                />
              </div>
              
              <div className="form-actions">
                <button className="btn btn-primary" onClick={calculateEMI}>
                  Calculate EMI
                </button>
                <button className="btn btn-secondary" onClick={resetEMI}>
                  Reset
                </button>
              </div>
            </div>
            
            {emiResult && (
              <div className="results">
                <h3>Results</h3>
                <div className="result-item">
                  <span>Monthly EMI:</span>
                  <span className="result-value">₹{emiResult.emi}</span>
                </div>
                <div className="result-item">
                  <span>Total Payment:</span>
                  <span className="result-value">₹{emiResult.totalPayment}</span>
                </div>
                <div className="result-item">
                  <span>Total Interest:</span>
                  <span className="result-value">₹{emiResult.totalInterest}</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'fuel' && (
          <div className="calculator-content">
            <h2>Fuel Cost Calculator</h2>
            <p>Calculate the fuel cost for your rides</p>
            
            <div className="calculator-form">
              <div className="form-group">
                <label>Distance (km)</label>
                <input 
                  type="number" 
                  value={distance} 
                  onChange={(e) => setDistance(Number(e.target.value))}
                  min="1"
                  max="10000"
                />
              </div>
              
              <div className="form-group">
                <label>Fuel Price (₹/liter)</label>
                <input 
                  type="number" 
                  value={fuelPrice} 
                  onChange={(e) => setFuelPrice(Number(e.target.value))}
                  min="1"
                  max="200"
                  step="0.1"
                />
              </div>
              
              <div className="form-group">
                <label>Mileage (km/liter)</label>
                <input 
                  type="number" 
                  value={mileage} 
                  onChange={(e) => setMileage(Number(e.target.value))}
                  min="10"
                  max="100"
                  step="0.1"
                />
              </div>
              
              <div className="form-actions">
                <button className="btn btn-primary" onClick={calculateFuelCost}>
                  Calculate Cost
                </button>
                <button className="btn btn-secondary" onClick={resetFuelCost}>
                  Reset
                </button>
              </div>
            </div>
            
            {fuelCostResult && (
              <div className="results">
                <h3>Results</h3>
                <div className="result-item">
                  <span>Fuel Required:</span>
                  <span className="result-value">{fuelCostResult.fuelRequired} liters</span>
                </div>
                <div className="result-item">
                  <span>Total Cost:</span>
                  <span className="result-value">₹{fuelCostResult.totalCost}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;