import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../hooks/useAuth';
import LoginModal from '../../auth/LoginModal';

const DishCard = ({ dish }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    addToCart(dish);
  };

  return (
    <>
      <Card className="h-100 hover-card">
        <Row className="g-0 h-100">
          <Col md={4}>
            <Card.Img
              src={dish.thumbnail}
              alt={dish.name}
              className="img-fluid rounded-start"
              style={{objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <Card.Body className="d-flex flex-column h-100">
              <div>
                <Card.Title className="mb-2">{dish.name}</Card.Title>
                <Card.Text className="text-muted mb-2">{dish.description}</Card.Text>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
                <span className="fw-bold">
                  {(dish.price*1000).toLocaleString()}đ
                </span>
                <button 
                  className="btn custom-btn-add"
                  onClick={handleAddToCart}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <LoginModal 
        show={showLoginModal} 
        onHide={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default DishCard; 