import { useContext } from 'react';
import { RestaurantAuthContext } from '../contexts/RestaurantAuthContext';

export const useRestaurantAuth = () => {
  const context = useContext(RestaurantAuthContext);
  if (!context) {
    throw new Error('useRestaurantAuth must be used within a RestaurantAuthProvider');
  }
  return context;
};
