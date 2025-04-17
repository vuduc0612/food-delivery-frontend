import { useState, useEffect, useCallback, useRef } from 'react';
import { restaurantOrderService } from '../services/restaurantOrderService';

export const useRestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sử dụng useRef để tránh circular dependency
  const ordersRef = useRef([]);

  // Lấy danh sách đơn hàng
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await restaurantOrderService.getOrders();
      console.log("Orders:", data);
      setOrders(data);
      ordersRef.current = data;
      setFilteredOrders(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi lấy danh sách đơn hàng');
      setLoading(false);
    }
  }, []);

  // Lấy chi tiết đơn hàng theo ID
  const fetchOrderById = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await restaurantOrderService.getOrderById(orderId);
      setSelectedOrder(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi lấy chi tiết đơn hàng');
      setLoading(false);
      return null;
    }
  }, []);

  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = useCallback(async (orderId, status) => {
    setLoading(true);
    setError(null);
    try {
      const updatedOrder = await restaurantOrderService.updateOrderStatus(orderId, status);
      
      // Cập nhật danh sách đơn hàng
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      );
      
      // Cập nhật danh sách đơn hàng đã lọc
      setFilteredOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      );
      
      // Cập nhật đơn hàng đang được chọn (nếu có)
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status });
      }
      
      setLoading(false);
      return updatedOrder;
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
      setLoading(false);
      return null;
    }
  }, [selectedOrder]);

  // Hàm lọc đơn hàng nội bộ (không phụ thuộc vào các hàm khác)
  const filterOrdersInternal = useCallback((ordersList, term, status) => {
    let results = [...ordersList];
    
    // Áp dụng tìm kiếm nếu có term
    if (term && term.trim()) {
      const lowercaseTerm = term.toLowerCase();
      results = results.filter(order => 
        (order.orderId && order.orderId.toLowerCase().includes(lowercaseTerm)) || 
        (order.customerName && order.customerName.toLowerCase().includes(lowercaseTerm)) ||
        (order.user && order.user.phone && order.user.phone.includes(term)) ||
        (order.user && order.user.email && order.user.email.toLowerCase().includes(lowercaseTerm))
      );
    }
    
    // Áp dụng lọc theo trạng thái nếu không phải 'all'
    if (status !== 'all') {
      results = results.filter(order => 
        order.status && order.status.toLowerCase() === status.toLowerCase()
      );
    }
    
    return results;
  }, []);
  
  // Tìm kiếm đơn hàng
  const searchOrders = useCallback((term) => {
    setSearchTerm(term);
    const results = filterOrdersInternal(ordersRef.current, term, statusFilter);
    setFilteredOrders(results);
  }, [statusFilter, filterOrdersInternal]);

  // Lọc đơn hàng theo trạng thái
  const filterOrdersByStatus = useCallback((status) => {
    setStatusFilter(status);
    const results = filterOrdersInternal(ordersRef.current, searchTerm, status);
    setFilteredOrders(results);
  }, [searchTerm, filterOrdersInternal]);

  // Tải danh sách đơn hàng khi component được mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  
  // Cập nhật ordersRef khi orders thay đổi
  useEffect(() => {
    ordersRef.current = orders;
  }, [orders]);

  return {
    orders,
    filteredOrders,
    selectedOrder,
    loading,
    error,
    statusFilter,
    searchTerm,
    fetchOrders,
    fetchOrderById,
    updateOrderStatus,
    searchOrders,
    filterOrdersByStatus,
    setSearchTerm,
    setStatusFilter
  };
};

export default useRestaurantOrders;
