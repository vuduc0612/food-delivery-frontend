import { useState, useEffect } from 'react';
import { API_URL } from '../config';

const useRestaurantData = (id) => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`${API_URL}/restaurants/${id}`);
        if (!response.ok) {
          throw new Error('Không tìm thấy nhà hàng');
        }
        const data = await response.json();
        setRestaurant(data.data);
        setDishes(data.data.dishes || []);
        
        const uniqueCategories = [...new Set(data.data.dishes.map(dish => dish.category))];
        const sortedCategories = uniqueCategories.sort((a, b) => {
          if (a === "Today's Offer") return -1;
          if (b === "Today's Offer") return 1;
          return 0;
        });
        setCategories(sortedCategories);
        if (sortedCategories.length > 0) {
          setActiveCategory(sortedCategories[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  return {
    restaurant,
    dishes,
    categories,
    loading,
    error,
    activeCategory,
    setActiveCategory
  };
};

export default useRestaurantData; 