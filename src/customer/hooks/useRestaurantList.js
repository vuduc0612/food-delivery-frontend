import { useEffect, useState } from 'react';
import { fetchRestaurants } from '../api/services/restaurantService';

const useRestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(8);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        console.log("Keyword:", keyword);
        const response = await fetchRestaurants(currentPage, limit, keyword);
        // console.log("Restaurant response:", response);
        
        if (response && response.data) {
          setRestaurants(response.data);
          setTotalPages(response.totalPages || 1);
          setCurrentPage(response.currentPage || 0);
      
        } else {
          setRestaurants([]);
          setTotalPages(1);
        }
      } catch (err) {
        setError(err.message);
        setRestaurants([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentPage, limit, keyword]);

  // Xử lý sắp xếp
  const handleSortChange = (value) => {
    setSortBy(value);
    let sorted = [...restaurants];

    switch (value) {
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        sorted.sort((a, b) => a.distance - b.distance);
        break;
      case 'popular':
        sorted.sort((a, b) => b.orderCount - a.orderCount);
        break;
      default:
        break;
    }

    setRestaurants(sorted);
  };

  // Xử lý chuyển trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Xử lý tìm kiếm
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Xử lý submit form tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
    setCurrentPage(0); // Reset về trang đầu tiên khi tìm kiếm mới
  };

  // Xử lý xóa tìm kiếm
  const handleClearSearch = () => {
    setSearchInput('');
    setKeyword('');
    setCurrentPage(0);
  };

  return {
    restaurants,
    loading,
    error,
    sortBy,
    currentPage,
    totalPages,
    searchInput,
    handleSortChange,
    handlePageChange,
    handleSearchChange,
    handleSearchSubmit,
    handleClearSearch
  };
};

export default useRestaurantList;
