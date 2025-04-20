import { useState, useCallback } from 'react';
import { restaurantDishService } from '../api/services/restaurantDishService';

/**
 * Hook quản lý chi tiết món ăn
 */
const useRestaurantDishDetail = () => {
  const [currentDish, setCurrentDish] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch dish by ID
  const fetchDishById = useCallback(async (dishId) => {
    if (!dishId) return null;
    
    try {
      setLoading(true);
      setError(null);
      const response = await restaurantDishService.getDishById(dishId);
      console.log("Dish details:", response);
      
      if (response && response.data) {
        setCurrentDish(response.data);
        return response.data;
      }
      return null;
    } catch (err) {
      console.error("Error fetching dish:", err);
      setError(err.message || 'Không thể tải thông tin món ăn');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset current dish
  const resetCurrentDish = useCallback(() => {
    setCurrentDish(null);
    setError(null);
  }, []);

  return {
    currentDish,
    loading,
    error,
    fetchDishById,
    resetCurrentDish
  };
};

export default useRestaurantDishDetail; 