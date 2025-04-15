import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { BsX, BsArrowLeft } from 'react-icons/bs';
import { verifyResetPasswordOtpApi, forgotPasswordApi } from '../../services/authService';

const VerifyOtpModal = ({ onHide, onSwitchToForgotPassword, onSwitchToResetPassword, email }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  
  const inputRefs = useRef([]);

  // Đếm ngược thời gian gửi lại OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Focus vào ô input đầu tiên khi component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Chỉ cho phép nhập số
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Tự động focus vào ô tiếp theo nếu đã nhập
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Xóa và quay lại ô trước đó khi nhấn Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    // Nếu dữ liệu dán là 6 số
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      
      // Focus vào ô cuối cùng
      if (inputRefs.current[5]) {
        inputRefs.current[5].focus();
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      setError(null);
      await forgotPasswordApi(email);
      setResendSuccess(true);
      setCountdown(60);
      
      // Ẩn thông báo thành công sau 3 giây
      setTimeout(() => {
        setResendSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Lỗi gửi lại OTP:', err);
      setError('Không thể gửi lại mã xác thực. Vui lòng thử lại sau.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Vui lòng nhập đủ 6 số');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      await verifyResetPasswordOtpApi(email, otpCode);
      
      // Chuyển sang màn hình đặt lại mật khẩu
      onSwitchToResetPassword(email, otpCode);
    } catch (err) {
      console.error('Lỗi xác thực OTP:', err);
      setError('Mã xác thực không đúng hoặc đã hết hạn');
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
            onClick={() => onSwitchToForgotPassword()}
            className="back-button"
            style={{ position: 'absolute', left: 0 }}
            disabled={loading}
          >
            <BsArrowLeft size={20} />
          </Button>
          <h4 className="mb-0">Xác thực mã OTP</h4>
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
          Nhập mã xác thực 6 số đã được gửi đến email <strong>{email}</strong>
        </p>

        {error && (
          <Alert variant="danger" className="error-alert mb-4">
            {error}
          </Alert>
        )}

        {resendSuccess && (
          <Alert variant="success" className="mb-4">
            Mã xác thực mới đã được gửi đến email của bạn
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <div className="otp-container d-flex justify-content-between mb-4">
            {otp.map((digit, index) => (
              <Form.Control
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                ref={(el) => (inputRefs.current[index] = el)}
                className="otp-input text-center"
                style={{ width: '45px', height: '45px', fontSize: '1.2rem' }}
                disabled={loading}
                required
              />
            ))}
          </div>

          <div className="text-center mb-4">
            <Button
              variant="link"
              onClick={handleResendOtp}
              disabled={countdown > 0 || loading || resendLoading}
              className="p-0"
            >
              {resendLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Đang xử lý...</span>
                </div>
              ) : countdown > 0 ? (
                `Gửi lại mã sau ${countdown}s`
              ) : (
                'Gửi lại mã xác thực'
              )}
            </Button>
          </div>

          <div className="d-grid gap-3">
            <Button 
              variant="primary" 
              type="submit"
              disabled={loading || otp.join('').length !== 6}
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
      </Modal.Body>
    </>
  );
};

export default VerifyOtpModal;
