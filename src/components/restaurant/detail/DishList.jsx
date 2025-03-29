import React from 'react';
import { Container } from 'react-bootstrap';
import DishSection from './DishSection';

const DishList = ({ categories, dishes }) => {
  return (
    <Container className="mt-4">
      {categories.map(category => (
        <DishSection
          key={category}
          category={category}
          dishes={dishes.filter(dish => dish.category === category)}
        />
      ))}
    </Container>
  );
};

export default DishList; 