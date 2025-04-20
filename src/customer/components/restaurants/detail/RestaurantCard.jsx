import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card as={Link} to={`/restaurant/${restaurant.id}`} className="h-100 text-decoration-none shadow-sm hover-card">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={restaurant.photoUrl} 
          alt={restaurant.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="position-absolute bottom-0 start-0 p-2 bg-white rounded-end">
          <small className="text-muted">
            <i className="bi bi-clock me-1"></i>
            25-35 phút
          </small>
        </div>
      </div>
      <Card.Body>
        <Card.Title className="text-dark mb-2 fs-6">{restaurant.name}</Card.Title>
        <div className="mb-2">
          <div className="d-flex align-items-center">
            <i className="bi bi-star-fill me-1 rating-star"></i>
            <span className="rating-text me-1 fs-7">4.5</span>
            <small className="rating-text">(999+)</small>
          </div>
        </div>
        <Card.Text className="text-muted small mb-1">
          <i className="bi bi-geo-alt me-1"></i>
          {restaurant.address}
        </Card.Text>
        
      </Card.Body>
    </Card>
  );
};

export default RestaurantCard; 