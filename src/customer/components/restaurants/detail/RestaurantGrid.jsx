import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RestaurantCard from './RestaurantCard';

const RestaurantGrid = ({ restaurants }) => {
  return (<>
    <h2 className="mb-3 mt-5">Nhà hàng gần bạn</h2> 
    <Row xs={1} md={2} lg={4} className="g-4">
      {restaurants.map(restaurant => (
        <Col key={restaurant.id}>
          <RestaurantCard restaurant={restaurant} />
        </Col>
      ))}
    </Row>
    </>
  );
};

export default RestaurantGrid; 