import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BsCheckCircleFill } from 'react-icons/bs';

const SuccessModal = ({ show, onHide, onLogin }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body className="text-center py-5">
        <BsCheckCircleFill size={70} className="text-success mb-4" />
        <h4 className="mb-3">Đăng ký thành công!</h4>
        <p className="text-muted mb-4">
          Tài khoản của bạn đã được tạo thành công. Vui lòng đăng nhập để tiếp tục.
        </p>
        <div className="d-grid">
          <Button 
            variant="primary" 
            onClick={() => {
              onHide();
              onLogin && onLogin();
            }}
            style={{ backgroundColor: '#7ed6df', borderColor: '#7ed6df' }}
          >
            Đăng nhập ngay
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessModal;