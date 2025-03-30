import { useEffect, useState } from 'react';
import { fetchRestaurants } from '../services/restaurantService';

const useRestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSortChange = (value) => {
    setSortBy(value);
    let sorted = [...restaurants];

    switch (value) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        sorted.sort((a, b) => a.distance - b.distance);
        break;
      case 'popular':
        sorted.sort((a, b) => b.orderCount - a.orderCount);
        break;
      default:
        break;
    }

    setRestaurants(sorted);
  };

  return {
    restaurants,
    loading,
    error,
    sortBy,
    handleSortChange,
  };
};

export default useRestaurantList;
