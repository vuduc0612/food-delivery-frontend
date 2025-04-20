import React, { useEffect, useState } from 'react';
import { Card, Spinner, Alert, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRestaurantAuth } from '../../hooks/useRestaurantAuth';
import useRestaurantDishes from '../../hooks/useRestaurantDishes';
import { 
  DishesTable, 
  DishesFilter, 
  DishesHeader, 
  DishesPagination, 
  DishesEmptyState,
  DishStatusDialog
} from './components';

const RestaurantDishes = () => {
  const navigate = useNavigate();
  const { loading: authLoading, isAuthenticated } = useRestaurantAuth();
  const { 
    dishes, 
    loading, 
    error, 
    searchTerm, 
    categoryFilter,
    categories,
    currentPage,
    totalPages,
    searchDishes,
    filterByCategory,
    handlePageChange,
    deleteDish,
    toggleDishStatus,
    fetchDishes
  } = useRestaurantDishes();

  // State cho dialog thay đổi trạng thái
  const [statusDialog, setStatusDialog] = useState({
    show: false,
    dishId: null,
    dishName: '',
    newStatus: '',
    loading: false
  });
  
  // State cho thông báo toast
  const [toast, setToast] = useState({
    show: false,
    message: '',
    variant: 'success'
  });

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate('/merchant-login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Hàm định dạng tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(amount)
      .replace('₫', 'đ');
  };

  // Xử lý tìm kiếm món ăn
  const handleSearch = (term) => {
    searchDishes(term);
  };

  // Xử lý lọc theo danh mục
  const handleCategoryFilter = (category) => {
    filterByCategory(category);
  };

  // Xử lý thêm món ăn mới
  const handleAddDish = () => {
    navigate('/merchant/dishes/add');
  };

  // Xử lý chỉnh sửa món ăn
  const handleEditDish = (dishId) => {
    navigate(`/merchant/dishes/edit/${dishId}`);
  };

  // Xử lý xóa món ăn
  const handleDeleteDish = async (dishId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa món ăn này?')) {
      const success = await deleteDish(dishId);
      if (success) {
        alert('Xóa món ăn thành công!');
      }
    }
  };

  // Mở dialog xác nhận thay đổi trạng thái
  const handleToggleStatus = (dishId, currentStatus, dishName) => {
    const newStatus = currentStatus === 'AVAILABLE' ? 'UNAVAILABLE' : 'AVAILABLE';
    
    setStatusDialog({
      show: true,
      dishId,
      dishName,
      newStatus,
      loading: false
    });
  };

  // Xử lý xác nhận thay đổi trạng thái
  const handleConfirmStatusChange = async () => {
    const { dishId, newStatus, dishName } = statusDialog;
    const statusText = newStatus === 'AVAILABLE' ? 'có sẵn' : 'không có sẵn';
    
    try {
      // Đánh dấu đang xử lý
      setStatusDialog(prev => ({ ...prev, loading: true }));
      
      // Gọi API để thay đổi trạng thái
      await toggleDishStatus(dishId, newStatus);
      
      // Luôn đóng dialog sau khi xử lý xong
      setStatusDialog(prev => ({ ...prev, show: false, loading: false }));
      
      // Tải lại danh sách món ăn bất kể kết quả
      await fetchDishes();
      
      // Hiển thị thông báo thành công
      setToast({
        show: true,
        message: `Món "${dishName}" đã được cập nhật thành ${statusText}`,
        variant: 'success'
      });
    } catch (err) {
      console.error("Error toggling dish status:", err);
      
      // Đóng dialog
      setStatusDialog(prev => ({ ...prev, show: false, loading: false }));
      
      // Hiển thị thông báo lỗi
      setToast({
        show: true,
        message: `Lỗi: ${err?.message || 'Không thể thay đổi trạng thái món ăn'}`,
        variant: 'danger'
      });
    }
  };

  // Đóng dialog
  const handleCloseStatusDialog = () => {
    setStatusDialog(prev => ({ ...prev, show: false }));
  };
  
  // Đóng toast
  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  // Hiển thị tên danh mục người dùng thân thiện
  const getCategoryDisplayName = (category) => {
    const categoryMap = {
      'main_course': 'Món chính',
      'appetizer': 'Khai vị',
      'dessert': 'Tráng miệng',
      'drink': 'Đồ uống',
      'combo': 'Combo',
      'side_dish': 'Món phụ',
      'soup': 'Súp',
      'salad': 'Salad',
      'breakfast': 'Bữa sáng',
      'lunch': 'Bữa trưa',
      'dinner': 'Bữa tối'
    };
    
    return categoryMap[category] || category;
  };

  if (authLoading || loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải danh sách món ăn...</p>
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
    <>
      <Card className="shadow-sm">
        <Card.Body>
          {/* Header */}
          <DishesHeader onAddDish={handleAddDish} />

          {/* Bộ lọc */}
          <DishesFilter 
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            categories={categories}
            onSearch={handleSearch}
            onFilterCategory={handleCategoryFilter}
            getCategoryDisplayName={getCategoryDisplayName}
          />

          {/* Bảng món ăn */}
          {dishes.length > 0 ? (
            <>
              <DishesTable 
                dishes={dishes} 
                formatCurrency={formatCurrency} 
                onEdit={handleEditDish}
                onDelete={handleDeleteDish}
                onToggleStatus={handleToggleStatus}
              />
              
              {/* Phân trang */}
              {totalPages >= 1 && (
                <DishesPagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <DishesEmptyState />
          )}
          
          {/* Dialog thay đổi trạng thái */}
          <DishStatusDialog 
            show={statusDialog.show}
            onHide={handleCloseStatusDialog}
            onConfirm={handleConfirmStatusChange}
            dishName={statusDialog.dishName}
            newStatus={statusDialog.newStatus}
            loading={statusDialog.loading}
          />
        </Card.Body>
      </Card>
      
      {/* Toast thông báo */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1060 }}>
        <Toast 
          show={toast.show} 
          onClose={handleCloseToast} 
          delay={3000} 
          autohide 
          bg={toast.variant}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className={toast.variant === 'danger' ? 'text-white' : ''}>
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default RestaurantDishes;
