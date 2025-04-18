import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ErrorState = ({ error }) => {
  return (
    <Alert variant="danger" className="my-3">
      <Alert.Heading>Đã xảy ra lỗi!</Alert.Heading>
      <p>{error}</p>
      <Button 
        variant="outline-danger" 
        as={Link}
        to="/merchan/orders"
        className="mt-2"
      >
        Quay lại danh sách đơn hàng
      </Button>
    </Alert>
  );
};

export default ErrorState;
