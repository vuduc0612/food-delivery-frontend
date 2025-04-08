import React from 'react';
import { BsSearch } from 'react-icons/bs';

const RestaurantListHeader = ({ onSortChange }) => {
  return (
    <div className="mb-4">
      <div className="d-flex align-items-center mb-3">
        <div className="position-relative" style={{ width: '480px' }}>
          <input
            type="search"
            placeholder="Tìm kiếm món ăn"
            className="custom-search w-100 ps-5 py-2 border-0"
          />
          <BsSearch className="search-icon position-absolute" style={{
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '18px'
          }} />
        </div>
        <div className="ms-auto">
          <select 
            className="form-select" 
            style={{ width: '200px' }}
            onChange={e => onSortChange(e.target.value)}
          >
            <option value="">Sắp xếp theo</option>
            <option value="rating">Đánh giá cao nhất</option>
            <option value="distance">Gần nhất</option>
            <option value="popular">Phổ biến nhất</option>
          </select>
        </div>
      </div>
      
    </div>
  );
};

export default RestaurantListHeader; 