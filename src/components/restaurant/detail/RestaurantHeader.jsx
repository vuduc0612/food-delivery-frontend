import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';

const RestaurantHeader = ({ restaurant, onSortChange }) => {
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
              <div className="me-2 d-flex align-items-center">
                <i className="bi bi-star-fill me-1 rating-star"></i>
                <span className="rating-text">4.5</span>
              </div>
              <span className="rating-text text-muted">(999+ đánh giá)</span>
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
        <div className="d-flex align-items-center mb-4">
          <h2 className="mb-0">Nhà hàng gần bạn</h2>
          <div className="ms-auto">
            <select className="form-select" onChange={e => onSortChange(e.target.value)}>
              <option value="">Sắp xếp theo</option>
              <option value="rating">Đánh giá cao nhất</option>
              <option value="distance">Gần nhất</option>
              <option value="popular">Phổ biến nhất</option>
            </select>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RestaurantHeader; 