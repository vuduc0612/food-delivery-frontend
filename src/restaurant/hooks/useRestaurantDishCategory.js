import { useState, useEffect, useCallback } from 'react';
import { restaurantDishService } from '../api/services/restaurantDishService';

/**
 * Hook quản lý danh mục món ăn
 */
const useRestaurantDishCategory = () => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await restaurantDishService.getCategories();
      console.log("Categories data:", response);
      
      if (response && response.data) {
        // Lấy danh sách danh mục từ API
        const categoriesData = {};
        response.data.forEach(category => {
          categoriesData[category.id] = category.name;
        });
        setCategories(categoriesData);
        return categoriesData;
      }
      return {};
    } catch (err) {
      console.error("Lỗi khi tải danh mục:", err);
      setError(err.message || 'Không thể tải danh mục món ăn');
      return {};
    } finally {
      setLoading(false);
    }
  }, []);

  // Lấy tên danh mục từ ID
  const getCategoryName = useCallback((categoryId) => {
    return categories[categoryId] || 'Không xác định';
  }, [categories]);

  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    getCategoryName
  };
};

export default useRestaurantDishCategory; 