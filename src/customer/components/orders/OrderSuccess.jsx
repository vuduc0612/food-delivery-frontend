import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';

const OrderSuccess = () => {
  return (
    <Container className="py-5">
      <div className="text-center">
        <BsCheckCircleFill className="text-success mb-4" style={{ fontSize: '64px' }} />
        <h2 className="mb-3">Đặt hàng thành công!</h2>
        <p className="text-muted mb-4">
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ giao hàng trong thời gian sớm nhất.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/orders" className="btn btn-primary">
            Xem đơn hàng
          </Link>
          <Link to="/" className="btn btn-outline-primary">
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default OrderSuccess; 