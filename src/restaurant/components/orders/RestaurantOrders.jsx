import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRestaurantAuth } from '../../hooks/useRestaurantAuth';
import useRestaurantOrders from '../../hooks/useRestaurantOrders';
import { 
  OrdersFilter, 
  OrdersTable
} from './components';

const RestaurantOrders = () => {
  const navigate = useNavigate();
  const { loading: authLoading, isAuthenticated } = useRestaurantAuth();
  const { 
    filteredOrders, 
    loading, 
    error, 
    statusFilter, 
    searchTerm, 
    updateOrderStatus, 
    filterOrdersByStatus, 
    searchOrders,
    currentPage,
    totalPages,
    handlePageChange
  } = useRestaurantOrders();

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate('/merchan-login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Hàm định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Hàm định dạng tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(amount)
      .replace('₫', 'đ');
  };

  // Xử lý cập nhật trạng thái đơn hàng
  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  // Xử lý tìm kiếm đơn hàng
  const handleSearch = (term) => {
    searchOrders(term);
  };

  // Xử lý lọc đơn hàng theo trạng thái
  const handleFilterStatus = (status) => {
    filterOrdersByStatus(status);
  };

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

  if (authLoading || loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải danh sách đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="my-3">
        <Alert.Heading>Đã xảy ra lỗi!</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        {/* Bộ lọc và tìm kiếm */}
        <OrdersFilter 
          searchTerm={searchTerm} 
          statusFilter={statusFilter} 
          onSearch={handleSearch} 
          onFilterStatus={handleFilterStatus} 
        />

        {/* Bảng đơn hàng */}
        {filteredOrders.length > 0 ? (
          <>
            <OrdersTable 
              orders={filteredOrders} 
              onUpdateStatus={handleUpdateStatus} 
              formatDate={formatDate} 
              formatCurrency={formatCurrency} 
            />
            
            {/* Phân trang */}
            {totalPages >= 1 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination>{renderPaginationItems()}</Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted mb-0">Không có đơn hàng nào</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default RestaurantOrders;