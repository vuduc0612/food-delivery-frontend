import React from 'react';
import { Pagination } from 'react-bootstrap';

const DishesPagination = ({ currentPage, totalPages, onPageChange }) => {
  // Tạo các item cho phân trang
  const renderPaginationItems = () => {
    const items = [];
    
    // Nút Previous
    items.push(
      <Pagination.Prev 
        key="prev" 
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
      />
    );
    
    // Hiển thị tối đa 5 trang
    const startPage = Math.max(0, Math.min(currentPage - 2, totalPages - 5));
    const endPage = Math.min(startPage + 4, totalPages - 1);
    
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item 
          key={i} 
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    
    // Nút Next
    items.push(
      <Pagination.Next 
        key="next" 
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1 || totalPages === 0}
      />
    );
    
    return items;
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <Pagination>{renderPaginationItems()}</Pagination>
    </div>
  );
};

export default DishesPagination;
