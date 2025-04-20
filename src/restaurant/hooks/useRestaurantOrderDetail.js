import { useState, useEffect, useCallback } from 'react';
import { restaurantOrderService } from '../api/services/restaurantOrderService';

export const useRestaurantOrderDetail = (orderId) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details
  const fetchOrderDetails = useCallback(async () => {
    if (!orderId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await restaurantOrderService.getOrderById(orderId);
      console.log("Order details:", data);
      setOrder(data.data);
    } catch (err) {
      setError(err.message || 'Không thể tải thông tin đơn hàng');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  // Update order status
  const updateOrderStatus = async (newStatus) => {
    if (!orderId) return false;
    
    try {
      setLoading(true);
      await restaurantOrderService.updateOrderStatus(orderId, newStatus);
      setOrder(prev => prev ? { ...prev, status: newStatus } : null);
      return true;
    } catch (err) {
      setError(err.message || 'Không thể cập nhật trạng thái đơn hàng');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load order details on component mount or when orderId changes
  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  return {
    order,
    loading,
    error,
    updateOrderStatus,
    fetchOrderDetails
  };
};

export default useRestaurantOrderDetail;
