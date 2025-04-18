import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const NotFoundState = () => {
  return (
    <div className="text-center py-5">
      <div className="text-danger mb-3">
        <XCircle size={48} />
      </div>
      <h4>Không tìm thấy đơn hàng</h4>
      <Button 
        variant="primary" 
        as={Link}
        to="/merchan/orders"
        className="mt-3"
      >
        Quay lại danh sách đơn hàng
      </Button>
    </div>
  );
};

export default NotFoundState;
