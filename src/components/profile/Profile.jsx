import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();

  return (
    <Container className="py-5">
      <h2 className="mb-4">Thông tin tài khoản</h2>
      <div className="bg-white rounded-3 shadow-sm p-4">
        <div className="mb-3">
          <label className="text-muted mb-2">Email</label>
          <div>{user?.email}</div>
        </div>
      </div>
    </Container>
  );
};

export default Profile; 