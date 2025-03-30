import { useState, useEffect } from 'react';
import { fetchRestaurantById } from '../services/restaurantService';

const useRestaurantInfo = (id) => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const data = await fetchRestaurantById(id);
        setRestaurant(data);
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
