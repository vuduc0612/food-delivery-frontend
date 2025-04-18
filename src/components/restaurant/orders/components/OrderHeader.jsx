import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const OrderHeader = ({ orderId }) => {
  return (
    <Card.Header className="bg-white">
      <div className="d-flex justify-content-between align-items-center">
        <Button 
          variant="light" 
          className="d-flex align-items-center p-0 border-0" 
          as={Link}
          to="/merchan/orders"
        >
          <ArrowLeft size={20} className="me-2" />
          <h5 className="mb-0">Chi tiết đơn hàng #{orderId}</h5>
        </Button>
      </div>
    </Card.Header>
  );
};

export default OrderHeader;
