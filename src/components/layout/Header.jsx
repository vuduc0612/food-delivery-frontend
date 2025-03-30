import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Dropdown } from 'react-bootstrap';
import { BsSearch, BsCart3, BsPerson, BsBoxArrowRight, BsPersonCircle, BsClipboardCheck } from 'react-icons/bs';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../hooks/useAuth';
import LoginModal from '../auth/LoginModal';

const Header = () => {
  const { toggleCart, items } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  

  const handleAuthClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
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

              {isAuthenticated ? (
                <Dropdown align="end">
                  <Dropdown.Toggle as={CustomToggle}>
                    <BsPerson className="me-2" style={{ fontSize: '20px' }} />
                    <span>{user?.email || 'Tài khoản'}</span>
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
                      <div className="fw-medium text-truncate" style={{ fontSize: '15px' }}>{user?.email}</div>
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

      <LoginModal 
        show={showLoginModal} 
        onHide={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Header; 