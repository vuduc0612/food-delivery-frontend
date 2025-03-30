import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { BsSearch, BsCart3, BsPerson } from 'react-icons/bs';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../hooks/useAuth';
import LoginModal from '../auth/LoginModal';

const Header = () => {
  const { toggleCart, items } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <Navbar bg="white" expand="lg" className="sticky-top border-bottom py-4">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" style={{ fontSize: '24px' }}>
            <span className="fw-bold" style={{ color: '#7ed6df' }}>Food</span>
            <span className="fw-bold">Delivery</span>
          </Navbar.Brand>

          <div className="d-flex flex-grow-1 justify-content-between align-items-center">
            <div className="position-relative mx-5" style={{ width: '380px' }}>
              <input
                type="search"
                placeholder="Tìm kiếm địa điểm"
                className="custom-search w-100 ps-5 py-2 border-0"
              />
              <BsSearch className="search-icon position-absolute" style={{ 
                left: '20px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                fontSize: '18px'
              }} />
            </div>

            <div className="d-flex align-items-center gap-5">
              <button 
                className="btn text-dark p-0 d-flex align-items-center position-relative" 
                style={{ fontSize: '15px' }}
                onClick={toggleCart}
              >
                <BsCart3 className="me-2" style={{ fontSize: '20px' }} />
                Giỏ hàng
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </button>
              
              <button className="btn text-dark p-0" style={{ fontSize: '15px' }}>
                VI
              </button>

              <button 
                className="btn text-dark p-0 d-flex align-items-center" 
                style={{ fontSize: '15px' }}
                onClick={handleAuthClick}
              >
                <BsPerson className="me-2" style={{ fontSize: '20px' }} />
                {isAuthenticated ? (
                  <span>{user?.email || 'Tài khoản'}</span>
                ) : (
                  'Đăng nhập'
                )}
              </button>
            </div>
          </div>
        </Container>
      </Navbar>

      <LoginModal 
        show={showLoginModal} 
        onHide={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Header; 