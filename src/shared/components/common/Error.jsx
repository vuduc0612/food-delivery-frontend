import React from 'react';
import { Container } from 'react-bootstrap';

const Error = ({ error, notFound }) => {
  return (
    <Container className="py-5">
      <div className="text-center">
        <i className="bi bi-exclamation-circle display-4 text-danger"></i>
        <h4 className="mt-3">{notFound ? 'Không tìm thấy' : 'Có lỗi xảy ra'}</h4>
        <p className={notFound ? 'text-muted' : 'text-danger'}>
          {notFound ? 'Không tìm thấy nhà hàng' : error}
        </p>
      </div>
    </Container>
  );
};

export default Error; 