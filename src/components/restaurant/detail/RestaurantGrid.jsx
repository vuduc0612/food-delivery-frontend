import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RestaurantCard from './RestaurantCard';

const RestaurantGrid = ({ restaurants }) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {restaurants.map(restaurant => (
        <Col key={restaurant.id}>
          <RestaurantCard restaurant={restaurant} />
        </Col>
      ))}
    </Row>
  );
};

export default RestaurantGrid; 