import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const DishesHeader = ({ onAddDish }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h5 className="mb-0">Quản lý món ăn</h5>
      <Button 
        variant="primary" 
        onClick={onAddDish}
        className="d-flex align-items-center"
      >
        <FaPlus className="me-2" /> Thêm món ăn mới
      </Button>
    </div>
  );
};

export default DishesHeader;
