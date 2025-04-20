import { useState } from 'react';
import { orderService } from '../api/services/orderService';

export const useOrder = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getOrdersByUserCurrent();
      setOrders(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách đơn hàng');
      console.error('Error fetching orders:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Lấy chi tiết một đơn hàng
  const fetchOrderById = async (orderId) => {
    if (!orderId) {
      setError('Mã đơn hàng không hợp lệ');
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getOrderById(orderId);
      setCurrentOrder(response.data);
      return response.data;
    } catch (err) {
      setError(err.message || 'Không thể tải thông tin đơn hàng');
      console.error('Error fetching order details:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    currentOrder,
    loading,
    error,
    fetchOrders,
    fetchOrderById
  };
};

export default useOrder;
