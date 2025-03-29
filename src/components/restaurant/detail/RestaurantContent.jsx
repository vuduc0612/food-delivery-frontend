import React from 'react';
import RestaurantInfo from './RestaurantInfo';
import CategoryNavigation from './CategoryNavigation';
import DishList from './DishList';

const RestaurantContent = ({ 
  restaurant, 
  categories, 
  dishes, 
  activeCategory, 
  onCategoryClick 
}) => {
  return (
    <div className="pb-4">
      <RestaurantInfo restaurant={restaurant} />
      
      <CategoryNavigation
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
      />

      <DishList 
        categories={categories}
        dishes={dishes}
      />
    </div>
  );
};

export default RestaurantContent; 