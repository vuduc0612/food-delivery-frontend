import { useState, useEffect } from 'react';

const useDishesByRestaurant = (restaurant) => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    if (!restaurant) return;

    const allDishes = restaurant.dishes || [];
    setDishes(allDishes);

    const uniqueCategories = [...new Set(allDishes.map(d => d.category))];
    const sorted = uniqueCategories.sort((a, b) => {
      if (a === "Today's Offer") return -1;
      if (b === "Today's Offer") return 1;
      return 0;
    });

    setCategories(sorted);
    setActiveCategory(sorted[0] || '');
  }, [restaurant]);

  return { dishes, categories, activeCategory, setActiveCategory };
};

export default useDishesByRestaurant;
