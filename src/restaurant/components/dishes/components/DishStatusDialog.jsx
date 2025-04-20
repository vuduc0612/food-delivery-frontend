import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DishStatusDialog = ({ 
  show, 
  onHide, 
  onConfirm, 
  dishName, 
  newStatus,
  loading 
}) => {
  const statusText = newStatus === 'AVAILABLE' ? 'có sẵn' : 'không có sẵn';
  
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận thay đổi trạng thái</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Bạn có chắc chắn muốn đổi trạng thái món ăn 
          <strong> {dishName} </strong> 
          thành <strong>{statusText}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Hủy bỏ
        </Button>
        <Button 
          variant="primary" 
          onClick={onConfirm} 
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Xác nhận'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DishStatusDialog; 