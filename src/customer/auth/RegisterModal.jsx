import React, { useState, useContext, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { BsEnvelope, BsLock, BsX, BsPerson, BsEye, BsEyeSlash, BsTelephone } from 'react-icons/bs';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
import OtpModal from './OtpModal';
import SuccessModal from './SuccessModal';

const RegisterModal = ({ onHide, onSwitchToLogin }) => {
  const { register, loading, error, setError, registeredUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Reset state khi component unmount
  useEffect(() => {
    return () => {
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
      });
      setError(null);
      setValidationErrors({});
    };
  }, [setError]);

  const validateForm = () => {
    const errors = {};
    // Xác thực email
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'Email không hợp lệ';
    }
    
    // Xác thực họ tên
    if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
    }
    
    // Xác thực số điện thoại
    if (!formData.phoneNumber.match(/^[0-9]{10}$/)) {
      errors.phoneNumber = 'Số điện thoại phải có 10 chữ số';
    }
    
    // Xác thực mật khẩu
    if (formData.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    // Xác thực mật khẩu nhập lại
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Xóa lỗi xác thực khi người dùng bắt đầu gõ lại
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    setShowOtpModal(true);
    e.preventDefault();
    setShowOtpModal(true);
    // Xác thực form
    if (!validateForm()) return;

    // Gọi API đăng ký
    const success = await register({
      email: formData.email,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      password: formData.password
    });
    
    if (success) {
      setShowOtpModal(true);
    }
  };

  const handleOtpSuccess = () => {
    setShowOtpModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onSwitchToLogin();
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
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              padding: '0',
              background: 'none',
              border: 'none'
            }}
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
              isInvalid={!!validationErrors.fullName}
              // required
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 position-relative">
            <BsEnvelope className="input-icon" />
            <Form.Control
              type="email"
              name="email"
              placeholder="Email của bạn"
              value={formData.email}
              onChange={handleChange}
              // isInvalid={!!validationErrors.email}
              // required
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 position-relative">
            <BsTelephone className="input-icon" />
            <Form.Control
              type="tel"
              name="phoneNumber"
              placeholder="Số điện thoại"
              value={formData.phoneNumber}
              onChange={handleChange}
              // isInvalid={!!validationErrors.phoneNumber}
              // required
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 position-relative">
            <BsLock className="input-icon" />
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              // isInvalid={!!validationErrors.password}
              // required
            />
            <Button
              variant="link"
              className="show-password-button"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                padding: '0',
                color: '#6c757d'
              }}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </Button>
            <Form.Control.Feedback type="invalid">
              {validationErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4 position-relative">
            <BsLock className="input-icon" />
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              // isInvalid={!!validationErrors.confirmPassword}
              // required
            />
            <Button
              variant="link"
              className="show-password-button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type="button"
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                padding: '0',
                color: '#6c757d'
              }}
            >
              {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
            </Button>
            <Form.Control.Feedback type="invalid">
              {validationErrors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid gap-3">
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading}
              className="position-relative overflow-hidden"
              style={{ backgroundColor: '#7ed6df', borderColor: '#7ed6df' }}
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

      {/* Modal OTP */}
      <OtpModal
        show={showOtpModal}
        onHide={() => setShowOtpModal(false)}
        userData={registeredUser}
        onSuccess={handleOtpSuccess}
      />

      {/* Modal Success */}
      <SuccessModal 
        show={showSuccessModal}
        onHide={handleSuccessClose}
        onLogin={onSwitchToLogin}
      />
    </>
  );
};

export default RegisterModal;