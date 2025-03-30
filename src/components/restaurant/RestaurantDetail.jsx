import React from 'react';
import { useParams } from 'react-router-dom';

import useCategoryObserver from '../../hooks/useCategoryObserver';
import Loader from './common/Loader';
import Error from './common/Error';
import RestaurantContent from './detail/RestaurantContent';
import useRestaurantInfo from '../../hooks/useRestaurantDetail';
import useDishesByRestaurant from '../../hooks/useDishesByRestaurant';

const RestaurantDetail = () => {
  const { id } = useParams();
  const { restaurant, loading, error } = useRestaurantInfo(id);
  const { dishes, categories, activeCategory, setActiveCategory } = useDishesByRestaurant(restaurant);


  const { handleCategoryClick } = useCategoryObserver(categories, setActiveCategory);

  if (loading) {
    return <Loader message="Đang tải thông tin nhà hàng..." />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!restaurant) {
    return <Error notFound />;
  }

  return (
    <RestaurantContent
      restaurant={restaurant}
      categories={categories}
      dishes={dishes}
      activeCategory={activeCategory}
      onCategoryClick={handleCategoryClick}
    />
  );
};

export default RestaurantDetail; 