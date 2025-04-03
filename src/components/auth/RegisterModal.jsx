import React, { useState, useContext, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { BsEnvelope, BsLock, BsX, BsPerson, BsEye, BsEyeSlash } from 'react-icons/bs';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';

const RegisterModal = ({ onHide, onSwitchToLogin }) => {
  const { register, loading, error, setError } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Reset state khi component unmount
  useEffect(() => {
    return () => {
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setError(null);
    };
  }, [setError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra mật khẩu xác nhận
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    // Gọi API đăng ký - hiện tại chỉ truyền email và password
    // Bạn có thể điều chỉnh AuthContext để hỗ trợ thêm các trường khác
    const success = await register(formData.email, formData.password);
    if (success) {
      onHide();
    }
  };

  return (
    <>
      <Modal.Header className="border-0 pb-0 px-4 pt-4">
        <Modal.Title className="w-100 text-center position-relative">
          <h4 className="mb-0">Tạo tài khoản mới ✨</h4>
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
          Đăng ký để trải nghiệm dịch vụ tốt nhất từ chúng tôi
        </p>

        {error && (
          <Alert className="error-alert mb-4">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 position-relative">
            <BsPerson className="input-icon" />
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 position-relative">
            <BsEnvelope className="input-icon" />
            <Form.Control
              type="email"
              name="email"
              placeholder="Email của bạn"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 position-relative">
            <BsLock className="input-icon" />
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
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

          <Form.Group className="mb-4 position-relative">
            <BsLock className="input-icon" />
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <Button
              variant="link"
              className="show-password-button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type="button"
            >
              {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
            </Button>
          </Form.Group>

          <div className="d-grid gap-3">
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
              className="position-relative overflow-hidden"
            >
              <div className={loading ? 'opacity-0' : ''}>
                Đăng ký
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
                onClick={onSwitchToLogin}
              >
                Đã có tài khoản? Đăng nhập
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RegisterModal;