import React, { useState } from 'react';
import { Dropdown, Button, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle,
  Clock,
  Truck,
  ChevronDown
} from 'lucide-react';

const OrderStatusActions = ({ order, handleUpdateStatus }) => {
  const [updating, setUpdating] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');
  
  const isDisabled = order.status === 'delivered' || order.status === 'cancelled' || updating;

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdating(true);
    try {
      const success = await handleUpdateStatus(orderId, newStatus);
      if (success) {
        setToastVariant('success');
        setToastMessage(`Đã cập nhật trạng thái đơn hàng thành công!`);
      } else {
        setToastVariant('danger');
        setToastMessage('Cập nhật trạng thái thất bại. Vui lòng thử lại.');
      }
      setShowToast(true);
    } catch (error) {
      setToastVariant('danger');
      setToastMessage('Cập nhật trạng thái thất bại. Vui lòng thử lại.');
      setShowToast(true);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1070 }}>
        <Toast 
          onClose={() => setShowToast(false)} 
          show={showToast} 
          delay={3000} 
          autohide 
          bg={toastVariant}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">{toastVariant === 'success' ? 'Thành công' : 'Lỗi'}</strong>
          </Toast.Header>
          <Toast.Body className={toastVariant === 'success' ? '' : 'text-white'}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="mt-4 d-flex justify-content-end">
        <Dropdown align="end" className="me-2" disabled={isDisabled}>
          <Dropdown.Toggle 
            variant="primary" 
            className="d-flex align-items-center" 
            disabled={isDisabled}
          >
            {updating ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                <span>Đang cập nhật...</span>
              </>
            ) : (
              <>
                <span className="me-1">Cập nhật trạng thái</span>
                <ChevronDown size={14} />
              </>
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ minWidth: '200px' }}>
            {order.status === 'pending' && (
              <Dropdown.Item onClick={() => handleStatusUpdate(order.id, 'confirmed')} className="d-flex align-items-center">
                <CheckCircle size={16} className="me-2 text-success" />
                <span>Xác nhận đơn</span>
              </Dropdown.Item>
            )}
            {order.status === 'confirmed' && (
              <Dropdown.Item onClick={() => handleStatusUpdate(order.id, 'preparing')} className="d-flex align-items-center">
                <Clock size={16} className="me-2 text-primary" />
                <span>Bắt đầu chuẩn bị</span>
              </Dropdown.Item>
            )}
            {order.status === 'preparing' && (
              <Dropdown.Item onClick={() => handleStatusUpdate(order.id, 'out_for_delivery')} className="d-flex align-items-center">
                <Truck size={16} className="me-2 text-info" />
                <span>Bắt đầu giao hàng</span>
              </Dropdown.Item>
            )}
            {order.status === 'out_for_delivery' && (
              <Dropdown.Item onClick={() => handleStatusUpdate(order.id, 'delivered')} className="d-flex align-items-center">
                <CheckCircle size={16} className="me-2 text-success" />
                <span>Xác nhận đã giao</span>
              </Dropdown.Item>
            )}
            {(order.status !== 'delivered' && order.status !== 'cancelled') && (
              <Dropdown.Item onClick={() => handleStatusUpdate(order.id, 'cancelled')} className="d-flex align-items-center">
                <XCircle size={16} className="me-2 text-danger" />
                <span>Hủy đơn</span>
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        
        <Button 
          variant="outline-secondary" 
          className="d-flex align-items-center"
          as={Link}
          to="/merchan/orders"
          disabled={updating}
        >
          <span>Quay lại</span>
        </Button>
      </div>
    </>
  );
};

export default OrderStatusActions;
