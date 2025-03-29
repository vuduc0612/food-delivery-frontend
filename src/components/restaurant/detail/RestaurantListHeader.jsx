import React from 'react';

const RestaurantListHeader = ({ onSortChange }) => {
  return (
    <div className="d-flex align-items-center mb-4">
      <h2 className="mb-0">Nhà hàng gần bạn</h2>
      <div className="ms-auto">
        <select className="form-select" onChange={e => onSortChange(e.target.value)}>
          <option value="">Sắp xếp theo</option>
          <option value="rating">Đánh giá cao nhất</option>
          <option value="distance">Gần nhất</option>
          <option value="popular">Phổ biến nhất</option>
        </select>
      </div>
    </div>
  );
};

export default RestaurantListHeader; 