import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { API_URL } from '../../config';
import Loader from './common/Loader';
import Error from './common/Error';
import RestaurantListHeader from './detail/RestaurantListHeader';
import RestaurantGrid from './detail/RestaurantGrid';


const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${API_URL}/restaurants`);
        if (!response.ok) {
          throw new Error('Không thể tải danh sách nhà hàng');
        }
        const data = await response.json();
        setRestaurants(data.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleSortChange = (value) => {
    setSortBy(value);
    let sortedRestaurants = [...restaurants];
    switch (value) {
      case 'rating':
        sortedRestaurants.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        sortedRestaurants.sort((a, b) => a.distance - b.distance);
        break;
      case 'popular':
        sortedRestaurants.sort((a, b) => b.orderCount - a.orderCount);
        break;
      default:
        break;
    }
    setRestaurants(sortedRestaurants);
  };

  if (loading) {
    return <Loader message="Đang tải danh sách nhà hàng..." />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <Container className="py-4">
      <RestaurantListHeader onSortChange={handleSortChange} />
      <RestaurantGrid restaurants={restaurants} />
    </Container>
  );
};

export default RestaurantList; 