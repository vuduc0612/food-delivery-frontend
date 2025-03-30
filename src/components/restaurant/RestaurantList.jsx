import React from 'react';
import { Container } from 'react-bootstrap';
import Loader from './common/Loader';
import Error from './common/Error';
import RestaurantListHeader from './detail/RestaurantListHeader';
import RestaurantGrid from './detail/RestaurantGrid';
import useRestaurantList from '../../hooks/useRestaurantList';

const RestaurantList = () => {
  const { restaurants, loading, error, handleSortChange } = useRestaurantList();

  if (loading) 
    return <Loader message="Đang tải danh sách nhà hàng..." />;

  if (error) 
    return <Error error={error} />;

  return (
    <Container className="py-4">
      <RestaurantListHeader onSortChange={handleSortChange} />
      <RestaurantGrid restaurants={restaurants} />
    </Container>
  );
};

export default RestaurantList;
