import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import { verifyOtpApi, resendOtpApi } from '../api/services/authService';

const OtpModal = ({ show, onHide, userData, onSuccess, onResend }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60*2);
  const [resendAvailable, setResendAvailable] = useState(false);

  // References để focus vào các input OTP
  const inputRefs = Array(6).fill(0).map(() => React.createRef());

  // Thiết lập countdown timer
  useEffect(() => {
    let timer;
    if (show && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setResendAvailable(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [show, countdown]);

  // Reset state khi modal đóng và mở
  useEffect(() => {
    if (show) {
      setOtp(['', '', '', '', '', '']);
      setError('');
      setCountdown(60);
      setResendAvailable(false);
      // Focus vào input đầu tiên khi modal mở
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 300);
    }
  }, [show]);

  const handleOtpChange = (index, value) => {
    // Chỉ cho phép nhập số
    if (value && !/^\d*$/.test(value)) return;

    // Cập nhật giá trị OTP
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus vào input tiếp theo nếu người dùng nhập một số
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Xử lý phím Backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Nếu ô hiện tại trống và không phải ô đầu tiên, focus về ô trước đó
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Nếu dữ liệu dán vào có độ dài 6 và chỉ chứa số
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      // Focus vào ô cuối cùng
      inputRefs[5].current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Vui lòng nhập đủ 6 số mã OTP');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await verifyOtpApi(userData, otpCode);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Mã OTP không chính xác hoặc đã hết hạn');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!resendAvailable) return;
    
    setResendLoading(true);
    setError('');
    
    try {
      await resendOtpApi(userData.email);
      // Đặt lại đếm ngược và trạng thái gửi lại
      setCountdown(60);
      setResendAvailable(false);
      onResend && onResend();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể gửi lại mã OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="border-0 pb-0 px-4 pt-4">
        <Modal.Title className="w-100 text-center position-relative">
          <h4 className="mb-0">Xác thực tài khoản</h4>
          <Button
            variant="link"
            onClick={onHide}
            className="position-absolute top-0 end-0 p-0"
            style={{ fontSize: '24px', lineHeight: 1 }}
          >
            <BsX />
          </Button>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 pt-3">
        <p className="text-center mb-4">
          Chúng tôi đã gửi mã OTP đến email <strong>{userData?.email}</strong>. 
          Vui lòng kiểm tra và nhập mã xác thực 6 số để hoàn tất đăng ký.
        </p>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <div className="otp-container mb-4">
            <Row className="justify-content-center">
              {otp.map((digit, index) => (
                <Col xs="auto" key={index}>
                  <Form.Control
                    ref={inputRefs[index]}
                    className="otp-input text-center"
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    style={{
                      width: '50px',
                      height: '60px',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}
                    autoComplete="off"
                  />
                </Col>
              ))}
            </Row>
          </div>

          <div className="text-center mb-4">
            {resendAvailable ? (
              <Button
                variant="link"
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="p-0"
              >
                {resendLoading ? 'Đang gửi...' : 'Gửi lại mã OTP'}
              </Button>
            ) : (
              <p className="text-muted">
                Gửi lại mã sau: {countdown} giây
              </p>
            )}
          </div>

          <div className="d-grid">
            <Button
              variant="primary"
              type="submit"
              disabled={otp.join('').length !== 6 || loading}
              className="position-relative overflow-hidden"
              style={{ backgroundColor: '#7ed6df', borderColor: '#7ed6df' }}
            >
              <div className={loading ? 'opacity-0' : ''}>
                Xác nhận
              </div>
              {loading && (
                <div className="position-absolute top-50 start-50 translate-middle">
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Đang xử lý...</span>
                  </div>
                </div>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OtpModal;