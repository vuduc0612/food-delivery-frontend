import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { BsLock, BsX, BsArrowLeft, BsEye, BsEyeSlash, BsCheckCircle } from 'react-icons/bs';
import { resetPasswordApi } from '../../services/authService';

const ResetPasswordModal = ({ onHide, onSwitchToVerifyOtp, onSwitchToLogin, email, otpCode }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Kiểm tra độ mạnh mật khẩu
  const passwordStrength = () => {
    if (!newPassword) return 0;
    
    let score = 0;
    // Độ dài tối thiểu
    if (newPassword.length >= 8) score += 1;
    // Có chữ hoa
    if (/[A-Z]/.test(newPassword)) score += 1;
    // Có chữ thường
    if (/[a-z]/.test(newPassword)) score += 1;
    // Có số
    if (/[0-9]/.test(newPassword)) score += 1;
    // Có ký tự đặc biệt
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;
    
    return score;
  };

  const getPasswordStrengthText = () => {
    const strength = passwordStrength();
    if (strength === 0) return '';
    if (strength <= 2) return 'Yếu';
    if (strength <= 4) return 'Trung bình';
    return 'Mạnh';
  };

  const getPasswordStrengthColor = () => {
    const strength = passwordStrength();
    if (strength === 0) return '';
    if (strength <= 2) return 'danger';
    if (strength <= 4) return 'warning';
    return 'success';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra mật khẩu
    if (newPassword.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      await resetPasswordApi(email, otpCode, newPassword);
      setSuccess(true);
      
      // Chuyển về trang đăng nhập sau 3 giây
      setTimeout(() => {
        onSwitchToLogin();
      }, 3000);
    } catch (err) {
      console.error('Lỗi đặt lại mật khẩu:', err);
      setError('Không thể đặt lại mật khẩu. Vui lòng thử lại sau.');
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
            onClick={() => onSwitchToVerifyOtp(email)}
            className="back-button"
            style={{ position: 'absolute', left: 0 }}
            disabled={loading || success}
          >
            <BsArrowLeft size={20} />
          </Button>
          <h4 className="mb-0">Đặt lại mật khẩu</h4>
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
        {!success ? (
          <>
            <p className="modal-description text-center mb-4">
              Tạo mật khẩu mới cho tài khoản của bạn
            </p>

            {error && (
              <Alert variant="danger" className="error-alert mb-4">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 position-relative">
                <BsLock className="input-icon" />
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button
                  variant="link"
                  className="show-password-button"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  disabled={loading}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </Button>
              </Form.Group>

              {newPassword && (
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <small>Độ mạnh mật khẩu: <span className={`text-${getPasswordStrengthColor()}`}>{getPasswordStrengthText()}</span></small>
                  </div>
                  <div className="password-strength-bar mt-1 d-flex">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <div 
                        key={index} 
                        className={`strength-segment bg-${index <= passwordStrength() ? getPasswordStrengthColor() : 'light'}`}
                        style={{ height: '4px', flex: 1, marginRight: '2px' }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <Form.Group className="mb-4 position-relative">
                <BsLock className="input-icon" />
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button
                  variant="link"
                  className="show-password-button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  type="button"
                  disabled={loading}
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
                    Xác nhận
                  </div>
                  {loading && (
                    <div className="spinner-wrapper">
                      <div className="spinner-border spinner-border-sm text-light" role="status">
                        <span className="visually-hidden">Đang xử lý...</span>
                      </div>
                    </div>
                  )}
                </Button>
              </div>
            </Form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="success-icon mb-3">
              <BsCheckCircle size={60} className="text-success" />
            </div>
            <h4 className="mb-3">Đổi mật khẩu thành công!</h4>
            <p className="mb-4">Bạn có thể đăng nhập bằng mật khẩu mới.</p>
            <p className="text-muted">Đang chuyển hướng đến trang đăng nhập...</p>
          </div>
        )}
      </Modal.Body>
    </>
  );
};

export default ResetPasswordModal;
