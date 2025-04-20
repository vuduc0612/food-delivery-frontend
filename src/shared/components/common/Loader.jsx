import React from 'react';
import { Container } from 'react-bootstrap';

const Loader = ({ message = 'Đang tải...' }) => {
  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="text-center">
        <div className="spinner-border" style={{ color: '#7ed6df' }} role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-2">{message}</p>
      </div>
    </Container>
  );
};

export default Loader; 