import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth'; 
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { BsEnvelope, BsLock, BsX } from 'react-icons/bs';


const LoginModal = ({ show, onHide }) => {
  const { login, register, loading, error, setError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = isLogin 
      ? await login(email, password)
      : await register(email, password);
      
    if (success) {
      onHide();
      setEmail('');
      setPassword('');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      dialogClassName="login-modal"
    >
      <Modal.Header className="border-0 pb-0 px-4 pt-4">
        <Modal.Title className="w-100 text-center position-relative">
          <h4 className="mb-0">
            {isLogin ? 'Chào mừng trở lại! 👋' : 'Tạo tài khoản mới ✨'}
          </h4>
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
          {isLogin 
            ? 'Đăng nhập để tiếp tục mua sắm của bạn' 
            : 'Đăng ký để trải nghiệm dịch vụ tốt nhất từ chúng tôi'}
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
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {isLogin && (
            <div className="text-end mb-4">
              <Button variant="link">
                Quên mật khẩu?
              </Button>
            </div>
          )}

          <div className="d-grid gap-3">
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
              className="position-relative overflow-hidden"
            >
              <div className={loading ? 'opacity-0' : ''}>
                {isLogin ? 'Đăng nhập' : 'Đăng ký'}
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
                onClick={toggleMode}
              >
                {isLogin ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal; 