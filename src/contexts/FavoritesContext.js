import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorites from backend on initial render
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/favorites/user`,
        {
          headers: {
            'user-id': userId
          }
        }
      );
      
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (vehicle) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        // If not logged in, still update local state for UI consistency
        setFavorites(prevFavorites => {
          const isAlreadyFavorite = prevFavorites.some(fav => fav.vehicleId === vehicle.id);
          if (!isAlreadyFavorite) {
            return [...prevFavorites, {
              vehicleId: vehicle.id,
              vehicleName: vehicle.name,
              vehicleBrand: vehicle.brand,
              vehiclePrice: vehicle.price,
              vehicleImage: vehicle.image
            }];
          }
          return prevFavorites;
        });
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/favorites/add`,
        {
          vehicleId: vehicle.id,
          vehicleName: vehicle.name,
          vehicleBrand: vehicle.brand,
          vehiclePrice: vehicle.price,
          vehicleImage: vehicle.image
        },
        {
          headers: {
            'user-id': userId,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        setFavorites(prevFavorites => {
          const isAlreadyFavorite = prevFavorites.some(fav => fav.vehicleId === vehicle.id);
          if (!isAlreadyFavorite) {
            return [...prevFavorites, response.data.favorite];
          }
          return prevFavorites;
        });
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      // Still update local state for UI consistency
      setFavorites(prevFavorites => {
        const isAlreadyFavorite = prevFavorites.some(fav => fav.vehicleId === vehicle.id);
        if (!isAlreadyFavorite) {
          return [...prevFavorites, {
            vehicleId: vehicle.id,
            vehicleName: vehicle.name,
            vehicleBrand: vehicle.brand,
            vehiclePrice: vehicle.price,
            vehicleImage: vehicle.image
          }];
        }
        return prevFavorites;
      });
    }
  };

  const removeFromFavorites = async (vehicleId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        // If not logged in, still update local state for UI consistency
        setFavorites(prevFavorites => prevFavorites.filter(vehicle => vehicle.vehicleId !== vehicleId));
        return;
      }

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/favorites/remove/${vehicleId}`,
        {
          headers: {
            'user-id': userId
          }
        }
      );
      
      if (response.data.success) {
        setFavorites(prevFavorites => prevFavorites.filter(vehicle => vehicle.vehicleId !== vehicleId));
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      // Still update local state for UI consistency
      setFavorites(prevFavorites => prevFavorites.filter(vehicle => vehicle.vehicleId !== vehicleId));
    }
  };

  const toggleFavorite = async (vehicle) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        // If not logged in, still update local state for UI consistency
        setFavorites(prevFavorites => {
          const isAlreadyFavorite = prevFavorites.some(fav => fav.vehicleId === vehicle.id);
          if (isAlreadyFavorite) {
            return prevFavorites.filter(fav => fav.vehicleId !== vehicle.id);
          } else {
            return [...prevFavorites, {
              vehicleId: vehicle.id,
              vehicleName: vehicle.name,
              vehicleBrand: vehicle.brand,
              vehiclePrice: vehicle.price,
              vehicleImage: vehicle.image
            }];
          }
        });
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/favorites/toggle`,
        {
          vehicleId: vehicle.id,
          vehicleName: vehicle.name,
          vehicleBrand: vehicle.brand,
          vehiclePrice: vehicle.price,
          vehicleImage: vehicle.image
        },
        {
          headers: {
            'user-id': userId,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        if (response.data.isFavorited) {
          setFavorites(prevFavorites => {
            const isAlreadyFavorite = prevFavorites.some(fav => fav.vehicleId === vehicle.id);
            if (!isAlreadyFavorite) {
              return [...prevFavorites, response.data.favorite];
            }
            return prevFavorites;
          });
        } else {
          setFavorites(prevFavorites => prevFavorites.filter(fav => fav.vehicleId !== vehicle.id));
        }
      }
      // Refresh favorites to ensure consistency
      await fetchFavorites();
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Still update local state for UI consistency
      setFavorites(prevFavorites => {
        const isAlreadyFavorite = prevFavorites.some(fav => fav.vehicleId === vehicle.id);
        if (isAlreadyFavorite) {
          return prevFavorites.filter(fav => fav.vehicleId !== vehicle.id);
        } else {
          return [...prevFavorites, {
            vehicleId: vehicle.id,
            vehicleName: vehicle.name,
            vehicleBrand: vehicle.brand,
            vehiclePrice: vehicle.price,
            vehicleImage: vehicle.image
          }];
        }
      });
    }
  };

  const isFavorite = (vehicleId) => {
    return favorites.some(vehicle => vehicle.vehicleId === vehicleId);
  };

  const value = {
    favorites,
    loading,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    fetchFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};