import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { ChevronDown, CheckCircle, XCircle, Clock, Truck } from 'lucide-react';

const OrderActionsDropdown = ({ order, onUpdateStatus, isLastRow }) => {
  const dropDirection = isLastRow ? 'up' : 'down';
  const isDisabled = order.status.toLowerCase() === 'delivered' || order.status.toLowerCase() === 'cancelled';

  return (
    <Dropdown align="end" drop={dropDirection} disabled={isDisabled}>
      <Dropdown.Toggle 
        variant="outline-secondary" 
        size="sm" 
        className="d-flex align-items-center" 
        disabled={isDisabled}
      >
        <span className="d-none d-md-inline me-1">Cập nhật</span>
        <ChevronDown size={14} />
      </Dropdown.Toggle>
      <Dropdown.Menu>

        {/* PENDING */}
        {order.status.toLowerCase() === 'pending' && (
          <React.Fragment>
            <Dropdown.Item onClick={() => onUpdateStatus(order.id, 'confirmed')} className="d-flex align-items-center">
              <CheckCircle size={16} className="me-2 text-success" />
              <span>Xác nhận đơn</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onUpdateStatus(order.id, 'cancelled')} className="d-flex align-items-center">
              <XCircle size={16} className="me-2 text-danger" />
              <span>Hủy đơn</span>
            </Dropdown.Item>
          </React.Fragment>
        )}
        
        {/* CONFIRMED */}
        {order.status.toLowerCase() === 'confirmed' && (
          <React.Fragment>
            <Dropdown.Item onClick={() => onUpdateStatus(order.id, 'preparing')} className="d-flex align-items-center">
              <Clock size={16} className="me-2 text-primary" />
              <span>Bắt đầu chuẩn bị</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onUpdateStatus(order.id, 'cancelled')} className="d-flex align-items-center">
              <XCircle size={16} className="me-2 text-danger" />
              <span>Hủy đơn</span>
            </Dropdown.Item>
          </React.Fragment>
        )}
        
        {/* PREPARING */}
        {order.status.toLowerCase() === 'preparing' && (
          <React.Fragment>
            <Dropdown.Item onClick={() => onUpdateStatus(order.id, 'out_for_delivery')} className="d-flex align-items-center">
              <Truck size={16} className="me-2 text-info" />
              <span>Bắt đầu giao hàng</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onUpdateStatus(order.id, 'cancelled')} className="d-flex align-items-center">
              <XCircle size={16} className="me-2 text-danger" />
              <span>Hủy đơn</span>
            </Dropdown.Item>
          </React.Fragment>
        )}
        
        {/* OUT_FOR_DELIVERY */}
        {order.status.toLowerCase() === 'out_for_delivery' && (
          <React.Fragment>
            <Dropdown.Item onClick={() => onUpdateStatus(order.id, 'delivered')} className="d-flex align-items-center">
              <CheckCircle size={16} className="me-2 text-success" />
              <span>Xác nhận đã giao</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onUpdateStatus(order.id, 'cancelled')} className="d-flex align-items-center">
              <XCircle size={16} className="me-2 text-danger" />
              <span>Hủy đơn</span>
            </Dropdown.Item>
          </React.Fragment>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default OrderActionsDropdown;
