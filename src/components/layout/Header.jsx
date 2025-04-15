import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { BsCart3, BsPerson, BsBoxArrowRight, BsPersonCircle, BsClipboardCheck } from 'react-icons/bs';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from '../../contexts/LocationContext';
import AuthModal from '../auth/AuthModal';
import LocationSearch from '../common/LocationSearch';

const Header = () => {
  const { toggleCart, items } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { selectedLocation, updateLocation } = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleAuthClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  };

  const handleLocationSelect = (location) => {
    updateLocation(location);
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      ref={ref}
      className="btn text-dark p-0 d-flex align-items-center"
      style={{ fontSize: '15px' }}
      onClick={onClick}
    >
      {children}
    </button>
  ));

  return (
    <>
      <Navbar bg="white" expand="lg" className="sticky-top border-bottom py-4">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center" style={{ fontSize: '24px' }}>
            <span className="fw-bold" style={{ color: '#7ed6df' }}>Food</span>
            <span className="fw-bold">Delivery</span>
          </Navbar.Brand>

          <div className="d-flex flex-grow-1 justify-content-between align-items-center">
            <div className="position-relative mx-5" style={{ width: '500px' }}>
              <LocationSearch 
                onLocationSelect={handleLocationSelect}
                placeholder={
                  <div className="d-flex align-items-center" style={{ fontSize: '14px', color: '#2d3436' }}>
                    <div className="d-flex align-items-center me-2">
                      <i className="bi bi-circle-fill me-2" style={{ color: '#dc3545', fontSize: '8px' }}></i>
                      {selectedLocation.shortAddress}
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-geo-alt-fill me-1" style={{ color: '#6c757d' }}></i>
                      {selectedLocation.fullAddress}
                    </div>
                  </div>
                }
              />
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

              {isAuthenticated ? (
                <Dropdown align="end">
                  <Dropdown.Toggle as={CustomToggle}>
                    <BsPerson className="me-2" style={{ fontSize: '20px' }} />
                    <span>{user?.name ||user?.email || 'Tài khoản'}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{
                    marginTop: '15px',
                    padding: '0.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    minWidth: '220px'
                  }}>
                    <div className="px-3 py-2 mb-2">
                      <div className="text-muted" style={{ fontSize: '13px' }}>Xin chào!</div>
                      <div className="fw-medium text-truncate" style={{ fontSize: '15px' }}>{user?.name || user?.email}</div>
                    </div>
                    
                    <Dropdown.Item 
                      as={Link} 
                      to="/profile"
                      className="d-flex align-items-center rounded-3 mb-1 py-2"
                      style={{ fontSize: '14px' }}
                    >
                      <BsPersonCircle className="me-2" style={{ fontSize: '16px' }} />
                      Thông tin tài khoản
                    </Dropdown.Item>
                    
                    <Dropdown.Item 
                      as={Link} 
                      to="/orders"
                      className="d-flex align-items-center rounded-3 mb-1 py-2"
                      style={{ fontSize: '14px' }}
                    >
                      <BsClipboardCheck className="me-2" style={{ fontSize: '16px' }} />
                      Đơn hàng của tôi
                    </Dropdown.Item>
                    
                    <Dropdown.Divider className="my-2" style={{ opacity: 0.08 }} />
                    
                    <Dropdown.Item 
                      onClick={logout}
                      className="d-flex align-items-center rounded-3 text-danger py-2"
                      style={{ fontSize: '14px' }}
                    >
                      <BsBoxArrowRight className="me-2" style={{ fontSize: '16px' }} />
                      Đăng xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <button 
                  className="btn text-dark p-0 d-flex align-items-center" 
                  style={{ fontSize: '15px' }}
                  onClick={handleAuthClick}
                >
                  <BsPerson className="me-2" style={{ fontSize: '20px' }} />
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        </Container>
      </Navbar>

      <AuthModal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)} 
        initialMode="login"
      />
    </>
  );
};

export default Header;