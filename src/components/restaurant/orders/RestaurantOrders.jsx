import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRestaurantAuth } from '../../../hooks/useRestaurantAuth';
import useRestaurantOrders from '../../../hooks/useRestaurantOrders';
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
    searchOrders 
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
      <Card.Header className="bg-white">
        <h5 className="mb-0">Quản lý đơn hàng</h5>
      </Card.Header>
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
          <OrdersTable 
            orders={filteredOrders} 
            onUpdateStatus={handleUpdateStatus} 
            formatDate={formatDate} 
            formatCurrency={formatCurrency} 
          />
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