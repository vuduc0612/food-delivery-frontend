import React from 'react';
import { Container } from 'react-bootstrap';

const Orders = () => {
  return (
    <Container className="py-5">
      <h2 className="mb-4">Đơn hàng của tôi</h2>
      <div className="bg-white rounded-3 shadow-sm p-4">
        <div className="text-center text-muted py-5">
          Chưa có đơn hàng nào
        </div>
      </div>
    </Container>
  );
};

export default Orders; 