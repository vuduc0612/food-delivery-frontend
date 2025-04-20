import React from 'react';
import { Container, Pagination } from 'react-bootstrap';
import Loader from '../../../shared/components/common/Loader';
import Error from '../../../shared/components/common/Error';
import RestaurantListHeader from './detail/RestaurantListHeader';
import RestaurantGrid from './detail/RestaurantGrid';
import useRestaurantList from '../../hooks/useRestaurantList';

const RestaurantList = () => {
  const { 
    restaurants, 
    loading, 
    error, 
    handleSortChange, 
    currentPage, 
    totalPages, 
    handlePageChange,
    searchInput,
    handleSearchChange,
    handleSearchSubmit,
    handleClearSearch
  } = useRestaurantList();

  if (loading) 
    return <Loader message="Đang tải danh sách nhà hàng..." />;

  if (error) 
    return <Error error={error} />;

  // Tạo các item cho phân trang
  const renderPaginationItems = () => {
    const items = [];
    
    // Nút Previous
    items.push(
      <Pagination.Prev 
        key="prev" 
        onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
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
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    
    // Nút Next
    items.push(
      <Pagination.Next 
        key="next" 
        onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1 || totalPages === 0}
      />
    );
    
    return items;
  };

  return (
    <Container className="py-4">
      <RestaurantListHeader 
        onSortChange={handleSortChange}
        searchInput={searchInput}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        onClearSearch={handleClearSearch}
      />
      
      {restaurants.length > 0 ? (
        <>
          <RestaurantGrid restaurants={restaurants} />
          
          {/* Phân trang */}
          <div className="d-flex justify-content-center mt-4">
            <Pagination>{renderPaginationItems()}</Pagination>
          </div>
        </>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">Không tìm thấy nhà hàng nào phù hợp</p>
        </div>
      )}
    </Container>
  );
};

export default RestaurantList;
