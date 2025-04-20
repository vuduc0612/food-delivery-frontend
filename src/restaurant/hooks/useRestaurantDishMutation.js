import { useState, useCallback } from 'react';
import { restaurantDishService } from '../api/services/restaurantDishService';

/**
 * Hook quản lý thao tác thêm, sửa, xóa món ăn
 * @param {Function} onSuccess - Callback function được gọi khi thao tác thành công
 */
const useRestaurantDishMutation = (onSuccess = () => {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Thêm món ăn mới
  const createDish = useCallback(async (dishData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await restaurantDishService.createDish(dishData);
      console.log("Create dish response:", response);
      
      if (response && response.status === "OK") {
        onSuccess && onSuccess();
        return response.data;
      }
      
      throw new Error(response?.message || 'Không thể tạo món ăn mới');
    } catch (err) {
      console.error("Error creating dish:", err);
      setError(err.message || 'Không thể tạo món ăn mới');
      return null;
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  // Cập nhật món ăn
  const updateDish = useCallback(async (dishId, dishData) => {
    if (!dishId) {
      setError('ID món ăn không hợp lệ');
      return null;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await restaurantDishService.updateDish(dishId, dishData);
      console.log("Update dish response:", response);
      
      if (response && response.status === "OK") {
        onSuccess && onSuccess();
        return response.data;
      }
      
      throw new Error(response?.message || 'Không thể cập nhật món ăn');
    } catch (err) {
      console.error("Error updating dish:", err);
      setError(err.message || 'Không thể cập nhật món ăn');
      return null;
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  // Xóa món ăn
  const deleteDish = useCallback(async (dishId) => {
    if (!dishId) {
      setError('ID món ăn không hợp lệ');
      return false;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await restaurantDishService.deleteDish(dishId);
      console.log("Delete dish response:", response);
      
      if (response && response.status === "OK") {
        onSuccess && onSuccess();
        return true;
      }
      
      throw new Error(response?.message || 'Không thể xóa món ăn');
    } catch (err) {
      console.error("Error deleting dish:", err);
      setError(err.message || 'Không thể xóa món ăn');
      return false;
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  // Thay đổi trạng thái món ăn
  const toggleDishStatus = useCallback(async (dishId, status) => {
    if (!dishId) {
      setError('ID món ăn không hợp lệ');
      return false;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await restaurantDishService.toggleDishStatus(dishId, status);
      console.log("Toggle dish status response:", response);
      
      if (response && response.status === "OK") {
        onSuccess && onSuccess();
        return response.data;
      }
      
      throw new Error(response?.message || 'Không thể thay đổi trạng thái món ăn');
    } catch (err) {
      console.error("Error toggling dish status:", err);
      setError(err.message || 'Không thể thay đổi trạng thái món ăn');
      return false;
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  // Reset error state
  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    createDish,
    updateDish,
    deleteDish,
    toggleDishStatus,
    resetError
  };
};

export default useRestaurantDishMutation; 