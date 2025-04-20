import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import VerifyOtpModal from './VerifyOtpModal';
import ResetPasswordModal from './ResetPasswordModal';

const AuthModal = ({ show, onHide, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // Reset về mode mặc định khi đóng modal
  useEffect(() => {
    if (!show) {
      // Đợi animation đóng hoàn tất trước khi reset mode
      const timer = setTimeout(() => {
        setMode(initialMode);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [show, initialMode]);

  const switchToLogin = () => setMode('login');
  const switchToRegister = () => setMode('register');
  const switchToForgotPassword = () => setMode('forgot-password');
  
  const switchToVerifyOtp = (userEmail) => {
    setEmail(userEmail);
    setMode('verify-otp');
  };
  
  const switchToResetPassword = (userEmail, userOtpCode) => {
    setEmail(userEmail);
    setOtpCode(userOtpCode);
    setMode('reset-password');
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      dialogClassName={
        mode === 'login' ? "login-modal" : 
        mode === 'register' ? "register-modal" : 
        mode === 'forgot-password' ? "forgot-password-modal" : 
        mode === 'verify-otp' ? "verify-otp-modal" : 
        mode === 'reset-password' ? "reset-password-modal" : 
        mode === 'success' ? "success-modal" : 
        
        ""
      }
    >
      {mode === 'login' && (
        <LoginModal 
          onHide={onHide} 
          onSwitchToRegister={switchToRegister}
          onSwitchToForgotPassword={switchToForgotPassword}
        />
      )}
      
      {mode === 'register' && (
        <RegisterModal 
          onHide={onHide} 
          onSwitchToLogin={switchToLogin} 
        />
      )}
      
      {mode === 'forgot-password' && (
        <ForgotPasswordModal
          onHide={onHide}
          onSwitchToLogin={switchToLogin}
          onSwitchToVerifyOtp={switchToVerifyOtp}
        />
      )}
      
      {mode === 'verify-otp' && (
        <VerifyOtpModal
          onHide={onHide}
          onSwitchToForgotPassword={switchToForgotPassword}
          onSwitchToResetPassword={switchToResetPassword}
          email={email}
        />
      )}
      
      {mode === 'reset-password' && (
        <ResetPasswordModal
          onHide={onHide}
          onSwitchToVerifyOtp={switchToVerifyOtp}
          onSwitchToLogin={switchToLogin}
          email={email}
          otpCode={otpCode}
        />
      )}
    </Modal>
  );
};

export default AuthModal;