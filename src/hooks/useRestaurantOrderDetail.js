import { useState, useEffect, useCallback } from 'react';
import { restaurantOrderService } from '../services/restaurantOrderService';

export const useRestaurantOrderDetail = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy chi tiết đơn hàng
  const fetchOrderDetail = useCallback(async () => {
    if (!orderId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await restaurantOrderService.getOrderById(orderId);
      setOrder(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi lấy chi tiết đơn hàng');
      setLoading(false);
    }
  }, [orderId]);

  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = useCallback(async (status) => {
    if (!orderId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await restaurantOrderService.updateOrderStatus(orderId, status);
      setOrder(prevOrder => ({
        ...prevOrder,
        status
      }));
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
      setLoading(false);
      return false;
    }
  }, [orderId]);

  // Tải chi tiết đơn hàng khi component được mount hoặc orderId thay đổi
  useEffect(() => {
    fetchOrderDetail();
  }, [fetchOrderDetail]);

  return {
    order,
    loading,
    error,
    fetchOrderDetail,
    updateOrderStatus
  };
};

export default useRestaurantOrderDetail;
