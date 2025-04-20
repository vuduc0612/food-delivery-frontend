import { useState, useEffect } from 'react';
import { restaurantOrderService } from '../api/services/restaurantOrderService';

const useRestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);
  // Fetch orders with pagination
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const status = statusFilter === 'all' ? null : statusFilter;
      console.log("Fetching orders with status:", status, "page:", currentPage, "limit:", limit, "search:", searchTerm);
      
      const response = await restaurantOrderService.getOrdersWithPagination(
        currentPage, 
        limit, 
        status,
        searchTerm
      );
      
      console.log("Orders pagination response:", response);
      
      if (response && response.data) {
        setOrders(response.data);
        setFilteredOrders(response.data);
        setTotalPages(response.totalPages || 1);
        setCurrentPage(response.currentPage || 0);
      } else {
        setOrders([]);
        setFilteredOrders([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách đơn hàng');
      setOrders([]);
      setFilteredOrders([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Fetch order by ID
  const fetchOrderById = async (orderId) => {
    try {
      setOrderLoading(true);
      setOrderError(null);
      const data = await restaurantOrderService.getOrderById(orderId);
      setCurrentOrder(data);
      return data;
    } catch (err) {
      setOrderError(err.message || 'Không thể tải thông tin đơn hàng');
      return null;
    } finally {
      setOrderLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      await restaurantOrderService.updateOrderStatus(orderId, newStatus);
      
      // Fetch orders again to get updated list
      fetchOrders();
      
      // Update current order if it's the one being updated
      if (currentOrder && currentOrder.orderId === orderId) {
        setCurrentOrder({ ...currentOrder, status: newStatus });
      }
      
      return true;
    } catch (err) {
      setError(err.message || 'Không thể cập nhật trạng thái đơn hàng');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Filter orders by status
  const filterOrdersByStatus = (status) => {
    setStatusFilter(status);
    setCurrentPage(0); // Reset về trang đầu tiên khi thay đổi bộ lọc
  };

  // Search orders
  const searchOrders = (term) => {
    setSearchTerm(term);
    setCurrentPage(0); // Reset về trang đầu tiên khi tìm kiếm
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Load orders when dependencies change
  useEffect(() => {
    fetchOrders();
  }, [currentPage, limit, statusFilter, searchTerm]);

  // Load orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    filteredOrders,
    loading,
    error,
    statusFilter,
    searchTerm,
    currentOrder,
    orderLoading,
    orderError,
    currentPage,
    totalPages,
    fetchOrders,
    fetchOrderById,
    updateOrderStatus,
    filterOrdersByStatus,
    searchOrders,
    handlePageChange
  };
};

export default useRestaurantOrders;
