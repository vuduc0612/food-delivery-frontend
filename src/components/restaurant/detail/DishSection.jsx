import React from 'react';
import { Row, Col } from 'react-bootstrap';
import DishCard from './DishCard';

const DishSection = ({ category, dishes }) => {
  return (
    <div id={`category-${category}`} className="mb-4">
      <h2 className="mb-4">{category}</h2>
      <Row>
        {dishes.map(dish => (
          <Col key={dish.id} md={6} lg={4} className="mb-4">
            <DishCard dish={dish} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DishSection; 