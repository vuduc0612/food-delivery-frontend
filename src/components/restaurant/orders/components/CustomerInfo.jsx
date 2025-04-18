import React from 'react';
import { Col } from 'react-bootstrap';

const CustomerInfo = ({ order }) => {
  return (
    <Col md={6}>
      <h6 className="mb-3">Thông tin khách hàng</h6>
      <div className="mb-2 d-flex">
        <div className="text-muted" style={{ width: '150px' }}>Tên khách hàng:</div>
        <div className="fw-medium">{order.user.name}</div>
      </div>
      <div className="mb-2 d-flex">
        <div className="text-muted" style={{ width: '150px' }}>Số điện thoại:</div>
        <div>{order.user.phone}</div>
      </div>
      <div className="mb-2 d-flex">
        <div className="text-muted" style={{ width: '150px' }}>Địa chỉ giao hàng:</div>
        <div>{order.address}</div>
      </div>
    </Col>
  );
};

export default CustomerInfo;
