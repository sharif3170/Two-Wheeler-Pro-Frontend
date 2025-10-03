import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { ReviewsProvider } from './contexts/ReviewsContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import './App.css';

// Import components (to be created)
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import VehicleList from './pages/VehicleList';
import VehicleDetail from './pages/VehicleDetail';
import CompareVehicles from './pages/CompareVehicles';
import Calculator from './pages/Calculator';
import Showrooms from './pages/Showrooms';
import TestRide from './pages/TestRide';
import SellVehicle from './pages/SellVehicle';
import UpcomingLaunches from './pages/UpcomingLaunches';
import DealerDashboard from './pages/DealerDashboard';
import Profile from './pages/Profile';
import CommunicationPreferences from './pages/CommunicationPreferences';
import LoginHistory from './pages/LoginHistory';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import Contact from './pages/Contact';

function App() {
  return (
    <UserProvider>
      <ReviewsProvider>
        <FavoritesProvider>
          <Router>
            <div className="App">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/vehicles" element={<VehicleList />} />
                  <Route path="/vehicle/:id" element={<VehicleDetail />} />
                  <Route path="/compare" element={<CompareVehicles />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/showrooms" element={<Showrooms />} />
                  <Route path="/test-ride" element={<TestRide />} />
                  <Route path="/sell" element={<SellVehicle />} />
                  <Route path="/upcoming" element={<UpcomingLaunches />} />
                  <Route path="/dealer" element={<DealerDashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/preferences" element={<CommunicationPreferences />} />
                  <Route path="/login-history" element={<LoginHistory />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/refund" element={<RefundPolicy />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </FavoritesProvider>
      </ReviewsProvider>
    </UserProvider>
  );
}

export default App;