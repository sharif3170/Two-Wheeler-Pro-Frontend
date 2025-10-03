import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage on initial load
  useEffect(() => {
    const initAuth = async () => {
      const savedUser = localStorage.getItem('user');
      
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          // Store user ID separately for favorites
          if (userData._id) {
            localStorage.setItem('userId', userData._id);
          }
        } catch (err) {
          console.error('Error parsing user data:', err);
          localStorage.removeItem('user');
          localStorage.removeItem('userId');
        }
      }
      
      setLoading(false);
    };
    
    initAuth();
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      // Store user ID separately for favorites
      if (user._id) {
        localStorage.setItem('userId', user._id);
      }
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    // Store user ID separately for favorites
    if (userData._id) {
      localStorage.setItem('userId', userData._id);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  };

  const signup = (userData) => {
    setUser(userData);
    // Store user ID separately for favorites
    if (userData._id) {
      localStorage.setItem('userId', userData._id);
    }
  };

  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  // Add a mock isFavorite function for now
  const isFavorite = (vehicleId) => {
    // This is a placeholder implementation
    // In a real app, this would check against actual favorites data
    return false;
  };

  return (
    <UserContext.Provider value={{
      user,
      loading,
      login,
      logout,
      signup,
      updateUser,
      isFavorite
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};