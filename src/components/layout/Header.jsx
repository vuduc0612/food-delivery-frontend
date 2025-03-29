import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { BsSearch, BsCart3, BsPerson } from 'react-icons/bs';

const Header = () => {
  return (
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
            <button className="btn text-dark p-0 d-flex align-items-center" style={{ fontSize: '15px' }}>
              <BsCart3 className="me-2" style={{ fontSize: '20px' }} />
              Giỏ hàng
            </button>
            
            <button className="btn text-dark p-0" style={{ fontSize: '15px' }}>
              VI
            </button>

            <button className="btn text-dark p-0 d-flex align-items-center" style={{ fontSize: '15px' }}>
              <BsPerson className="me-2" style={{ fontSize: '20px' }} />
              Đăng nhập
            </button>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header; 