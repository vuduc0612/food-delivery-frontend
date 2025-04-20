import React from 'react';
import { Col, Badge } from 'react-bootstrap';

const OrderInfo = ({ order, formatDate, getStatusBadge }) => {
  return (
    <Col md={6} className="mb-4 mb-md-0">
      <h6 className="mb-3">Thông tin đơn hàng</h6>
      <div className="mb-2 d-flex">
        <div className="text-muted" style={{ width: '150px' }}>Mã đơn hàng:</div>
        <div className="fw-medium">{order.id}</div>
      </div>
      <div className="mb-2 d-flex">
        <div className="text-muted" style={{ width: '150px' }}>Thời gian đặt:</div>
        <div>{formatDate(order.order_time)}</div>
      </div>
      <div className="mb-2 d-flex">
        <div className="text-muted" style={{ width: '150px' }}>Trạng thái:</div>
        <div>{getStatusBadge(order.status)}</div>
      </div>
      <div className="mb-2 d-flex">
        <div className="text-muted" style={{ width: '150px' }}>Phương thức thanh toán:</div>
        <div>
          <Badge 
            bg={order.paymentMethod === 'CASH' ? 'light' : 'success'} 
            className={order.paymentMethod === 'CASH' ? 'text-dark border' : 'text-white'}
          >
            {order.paymentMethod === 'CASH' ? 'Tiền mặt khi nhận hàng' : 'Đã thanh toán qua VnPay'}
          </Badge>
        </div>
      </div>
    </Col>
  );
};

export default OrderInfo;
