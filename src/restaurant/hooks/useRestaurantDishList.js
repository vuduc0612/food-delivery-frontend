import { useState, useEffect, useCallback } from 'react';
import { restaurantDishService } from '../api/services/restaurantDishService';

/**
 * Hook quản lý danh sách món ăn và phân trang
 */
const useRestaurantDishList = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10);

  // Fetch dishes with pagination
  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching dishes with page:", currentPage, "limit:", limit, "search:", searchTerm, "category:", categoryFilter);
      
      const response = await restaurantDishService.getDishes(
        currentPage, 
        limit, 
        searchTerm,
        categoryFilter === 'all' ? null : categoryFilter
      );
      
      console.log("Dishes pagination response:", response);
      
      if (response && response.data) {
        setDishes(response.data);
        setTotalPages(response.totalPages || 1);
        // Không ghi đè currentPage từ API để giữ nguyên trang đã chọn
      } else {
        setDishes([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.message || 'Không thể tải danh sách món ăn');
      setDishes([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, searchTerm, categoryFilter]);

  // Search dishes
  const searchDishes = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(0); // Reset về trang đầu tiên khi tìm kiếm
  }, []);

  // Filter dishes by category
  const filterByCategory = useCallback((category) => {
    console.log("Filtering by category:", category);
    // So sánh với giá trị hiện tại để tránh gọi API lại nếu không cần thiết
    if (category !== categoryFilter) {
      setCategoryFilter(category);
      setCurrentPage(0); // Reset về trang đầu tiên khi lọc
    }
  }, [categoryFilter]);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    console.log("Changing page from", currentPage, "to", page);
    // Chỉ cập nhật khi trang thay đổi thực sự
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [currentPage]);

  // Load dishes when dependencies change
  useEffect(() => {
    console.log("Dependencies changed, fetching dishes...");
    console.log("Current state:", { currentPage, searchTerm, categoryFilter });
    fetchDishes();
  }, [fetchDishes, currentPage, searchTerm, categoryFilter]);

  return {
    dishes,
    loading,
    error,
    searchTerm,
    categoryFilter,
    currentPage,
    totalPages,
    fetchDishes,
    searchDishes,
    filterByCategory,
    handlePageChange
  };
};

export default useRestaurantDishList; 