import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';

const RestaurantInfo = ({ restaurant }) => {
  if (!restaurant) return null;

  return (
    <div className="bg-white border-bottom">
      <Container>
        <Row className="py-4">
          <Col md={3}>
            <img 
              src={restaurant.photoUrl} 
              alt={restaurant.name}
              className="img-fluid rounded"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={9}>
            <h1 className="mb-2">{restaurant.name}</h1>
            <div className="d-flex align-items-center mb-2">
              <Badge bg="success" className="me-2">
                <i className="bi bi-star-fill me-1"></i>
                4.5
              </Badge>
              <span className="text-muted">(999+ đánh giá)</span>
            </div>
            <p className="mb-2">
              <i className="bi bi-geo-alt me-2"></i>
              {restaurant.address}
            </p>
            <p className="mb-2">
              <i className="bi bi-telephone me-2"></i>
              {restaurant.phoneNumber}
            </p>
            <p className="mb-0">
              <i className="bi bi-clock me-2"></i>
              Mở cửa: 07:00 - 22:00
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RestaurantInfo; 