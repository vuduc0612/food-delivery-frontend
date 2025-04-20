import React from 'react';
import { Badge } from 'react-bootstrap';

const OrderStatusBadge = ({ status }) => {
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge bg="warning" className="text-dark">Chờ xác nhận</Badge>;
      case 'confirmed':
        return <Badge bg="info">Đã xác nhận</Badge>;
      case 'preparing':
        return <Badge bg="primary">Đang chuẩn bị</Badge>;
      case 'out_for_delivery':
        return <Badge bg="info" style={{ backgroundColor: '#17a2b8' }}>Đang giao</Badge>;
      case 'delivered':
        return <Badge bg="success">Đã giao</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Đã hủy</Badge>;
      default:
        return <Badge bg="secondary">Không xác định</Badge>;
    }
  };

  return getStatusBadge(status);
};

export default OrderStatusBadge;
