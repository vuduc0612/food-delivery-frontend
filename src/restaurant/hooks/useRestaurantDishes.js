import { useCallback } from 'react';
import useRestaurantDishList from './useRestaurantDishList';
import useRestaurantDishDetail from './useRestaurantDishDetail';
import useRestaurantDishCategory from './useRestaurantDishCategory';
import useRestaurantDishMutation from './useRestaurantDishMutation';

/**
 * Hook tổng hợp quản lý món ăn của nhà hàng
 * Tách thành các hook nhỏ để dễ quản lý và tránh render không cần thiết
 */
const useRestaurantDishes = () => {
  // Lấy các hook con
  const dishList = useRestaurantDishList();
  const dishDetail = useRestaurantDishDetail();
  const dishCategory = useRestaurantDishCategory();
  
  // Callback khi thao tác mutation thành công
  const handleMutationSuccess = useCallback(() => {
    // Refresh danh sách món ăn
    dishList.fetchDishes();
  }, [dishList]);
  
  const dishMutation = useRestaurantDishMutation(handleMutationSuccess);

  return {
    // Danh sách
    dishes: dishList.dishes,
    loading: dishList.loading || dishMutation.loading || dishCategory.loading,
    error: dishList.error || dishMutation.error || dishCategory.error,
    currentPage: dishList.currentPage,
    totalPages: dishList.totalPages,
    searchTerm: dishList.searchTerm,
    categoryFilter: dishList.categoryFilter,
    fetchDishes: dishList.fetchDishes,
    searchDishes: dishList.searchDishes,
    filterByCategory: dishList.filterByCategory,
    handlePageChange: dishList.handlePageChange,
    
    // Chi tiết món ăn
    currentDish: dishDetail.currentDish,
    dishLoading: dishDetail.loading,
    dishError: dishDetail.error,
    fetchDishById: dishDetail.fetchDishById,
    
    // Danh mục
    categories: dishCategory.categories,
    categoriesLoading: dishCategory.loading,
    categoriesError: dishCategory.error,
    fetchCategories: dishCategory.fetchCategories,
    getCategoryName: dishCategory.getCategoryName,
    
    // Thao tác CRUD
    createDish: dishMutation.createDish,
    updateDish: dishMutation.updateDish,
    deleteDish: dishMutation.deleteDish, 
    toggleDishStatus: dishMutation.toggleDishStatus,
    mutationLoading: dishMutation.loading,
    mutationError: dishMutation.error,
    resetMutationError: dishMutation.resetError
  };
};

export default useRestaurantDishes;
