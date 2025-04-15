import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { BsEnvelope, BsX, BsArrowLeft } from 'react-icons/bs';
import { forgotPasswordApi } from '../../services/authService';

const ForgotPasswordModal = ({ onHide, onSwitchToLogin, onSwitchToVerifyOtp }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      await forgotPasswordApi(email);
      setSuccess(true);
      
      // Chuyển sang màn hình xác thực OTP sau 1.5 giây
      setTimeout(() => {
        onSwitchToVerifyOtp(email);
      }, 1500);
    } catch (err) {
      console.error('Lỗi quên mật khẩu:', err);
      setError(err.message || 'Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal.Header className="border-0 pb-0 px-4 pt-4">
        <Modal.Title className="w-100 text-center position-relative">
          <Button
            variant="link"
            onClick={onSwitchToLogin}
            className="back-button"
            style={{ position: 'absolute', left: 0 }}
          >
            <BsArrowLeft size={20} />
          </Button>
          <h4 className="mb-0">Quên mật khẩu</h4>
          <Button
            variant="link"
            onClick={onHide}
            className="close-button"
          >
            <BsX size={24} />
          </Button>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pt-3">
        <p className="modal-description text-center mb-4">
          Nhập email của bạn để nhận mã xác thực đặt lại mật khẩu
        </p>

        {error && (
          <Alert variant="danger" className="error-alert mb-4">
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mb-4">
            Mã xác thực đã được gửi đến email của bạn
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4 position-relative">
            <BsEnvelope className="input-icon" />
            <Form.Control
              type="email"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading || success}
            />
          </Form.Group>

          <div className="d-grid gap-3">
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading || success}
              className="position-relative overflow-hidden"
            >
              <div className={loading ? 'opacity-0' : ''}>
                {success ? 'Đã gửi mã xác thực' : 'Gửi mã xác thực'}
              </div>
              {loading && (
                <div className="spinner-wrapper">
                  <div className="spinner-border spinner-border-sm text-light" role="status">
                    <span className="visually-hidden">Đang xử lý...</span>
                  </div>
                </div>
              )}
            </Button>

            <div className="text-center mt-3">
              <Button
                variant="link"
                onClick={onSwitchToLogin}
                disabled={loading}
              >
                Quay lại đăng nhập
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default ForgotPasswordModal;
