import { useState, useEffect } from 'react';
import { fetchRestaurantById } from '../api/services/restaurantService';

const useRestaurantInfo = (id) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await fetchRestaurantById(id);
        setRestaurant(response.data);
      } catch (err) {
        setError(err.message || 'Đã xảy ra lỗi');
      } finally {
        setLoading(false);
      }
    };

    getRestaurant();
  }, [id]);

  return { restaurant, loading, error };
};

export default useRestaurantInfo;
