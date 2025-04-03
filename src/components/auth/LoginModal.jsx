import React, { useState, useContext, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { BsEnvelope, BsLock, BsX, BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';

const LoginModal = ({ onHide, onSwitchToRegister }) => {
  const { login, loading, error, setError } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Reset state khi component unmount
  useEffect(() => {
    return () => {
      setEmail('');
      setPassword('');
      setError(null);
    };
  }, [setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      onHide();
    }
  };

  return (
    <>
      <Modal.Header className="border-0 pb-0 px-4 pt-4">
        <Modal.Title className="w-100 text-center position-relative">
          <h4 className="mb-0">Chào mừng trở lại! 👋</h4>
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
          Đăng nhập để tiếp tục mua sắm của bạn
        </p>

        {error && (
          <Alert className="error-alert mb-4">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 position-relative">
            <BsEnvelope className="input-icon" />
            <Form.Control
              type="email"
              placeholder="Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <BsLock className="input-icon" />
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant="link"
              className="show-password-button"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </Button>
          </Form.Group>

          <div className="text-end mb-4">
            <Button variant="link">
              Quên mật khẩu?
            </Button>
          </div>

          <div className="d-grid gap-3">
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
              className="position-relative overflow-hidden"
            >
              <div className={loading ? 'opacity-0' : ''}>
                Đăng nhập
              </div>
              {loading && (
                <div className="spinner-wrapper">
                  <div className="spinner-border spinner-border-sm text-light" role="status">
                    <span className="visually-hidden">Đang xử lý...</span>
                  </div>
                </div>
              )}
            </Button>

            <div className="divider">
              <hr />
              <span className="divider-text">
                Hoặc tiếp tục với
              </span>
            </div>

            <div className="d-flex gap-2">
              <Button 
                variant="light" 
                className="w-50 btn-social d-flex align-items-center justify-content-center gap-2"
              >
                <FaGoogle style={{ color: '#DB4437' }} />
                <span>Google</span>
              </Button>
              
              <Button 
                variant="light" 
                className="w-50 btn-social d-flex align-items-center justify-content-center gap-2"
              >
                <FaFacebook style={{ color: '#4267B2' }} />
                <span>Facebook</span>
              </Button>
            </div>

            <div className="text-center mt-4">
              <Button
                variant="link"
                onClick={onSwitchToRegister}
              >
                Chưa có tài khoản? Đăng ký ngay
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default LoginModal;