import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingState = () => {
  return (
    <div className="text-center py-5">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2">Đang tải thông tin đơn hàng...</p>
    </div>
  );
};

export default LoadingState;
