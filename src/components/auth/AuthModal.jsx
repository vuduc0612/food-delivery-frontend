import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const AuthModal = ({ show, onHide, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);

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

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      dialogClassName={mode === 'login' ? "login-modal" : "register-modal"}
    >
      {mode === 'login' ? (
        <LoginModal 
          onHide={onHide} 
          onSwitchToRegister={switchToRegister} 
        />
      ) : (
        <RegisterModal 
          onHide={onHide} 
          onSwitchToLogin={switchToLogin} 
        />
      )}
    </Modal>
  );
};

export default AuthModal;