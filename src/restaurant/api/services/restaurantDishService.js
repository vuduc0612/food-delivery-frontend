import restaurantAxiosClient from '../clients/restaurantAxiosClient';

export const restaurantDishService = {
  // Lấy danh sách món ăn của nhà hàng
  getDishes: async (page = 0, limit = 10, searchTerm = '', categoryId = null) => {
    try {
      // Đảm bảo page là một số nguyên không âm
      const pageNumber = Math.max(0, parseInt(page) || 0);
      
      let url = `/dishes/restaurant/me?page=${pageNumber}&limit=${limit}`;
      if (searchTerm && searchTerm.trim() !== '') {
        url += `&keyword=${encodeURIComponent(searchTerm)}`;
      }
      if (categoryId && categoryId !== 'null' && categoryId !== 'undefined' && categoryId !== 'all') {
        url += `&categoryId=${categoryId}`;
      }
      console.log("Calling API with URL:", url);
      console.log("Parameters:", { page: pageNumber, limit, searchTerm, categoryId });
      
      const response = await restaurantAxiosClient.get(url);
      console.log("Full API response:", response);
      return response;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách món ăn:', error);
      throw error;
    }
  },

  // Lấy tất cả danh mục của nhà hàng
  getCategories: async () => {
    try {
      const response = await restaurantAxiosClient.get('/categories/current');
      console.log("Categories response:", response);
      return response;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách danh mục:', error);
      throw error;
    }
  },

  // Lấy chi tiết món ăn
  getDishById: async (dishId) => {
    try {
      const response = await restaurantAxiosClient.get(`/dishes/${dishId}`);
      return response;
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết món ăn:', error);
      throw error;
    }
  },

  // Thêm món ăn mới
  createDish: async (dishData) => {
    try {
      const formData = new FormData();
      
      // Thêm các trường dữ liệu vào formData
      formData.append('name', dishData.name);
      formData.append('price', dishData.price);
      formData.append('description', dishData.description || '');
      formData.append('categoryName', dishData.categoryName);
      formData.append('thumbnail', '');
      
      // Thêm ảnh nếu có
      if (dishData.file && dishData.file instanceof File) {
        console.log("Uploading image:", dishData.file.name);
        formData.append('file', dishData.file);
      } else {
        // API yêu cầu file là bắt buộc
        const emptyBlob = new Blob([''], { type: 'image/png' });
        const emptyFile = new File([emptyBlob], 'empty.png', { type: 'image/png' });
        formData.append('file', emptyFile);
      }
      
      console.log("Sending create dish request with data:", {
        name: dishData.name,
        price: dishData.price,
        description: dishData.description,
        categoryName: dishData.categoryName
      });
      
      const response = await restaurantAxiosClient.post('/dishes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;
    } catch (error) {
      console.error('Lỗi khi thêm món ăn:', error);
      throw error;
    }
  },

  // Cập nhật món ăn
  updateDish: async (dishId, dishData) => {
    try {
      const formData = new FormData();
      
      // Thêm các trường dữ liệu vào formData
      formData.append('name', dishData.name);
      formData.append('price', dishData.price);
      formData.append('description', dishData.description || '');
      formData.append('categoryName', dishData.categoryName);
      
      // Chỉ gửi file khi người dùng đã chọn ảnh mới
      if (dishData.file && dishData.file instanceof File) {
        console.log("Uploading new image:", dishData.file.name);
        formData.append('file', dishData.file);
        formData.append('thumbnail', '');
      } else {
        // API yêu cầu file là bắt buộc, nên nếu không có file mới, cần xử lý ở backend
        // Tạm thời có thể gửi một file trống hoặc giữ ảnh cũ
        const emptyBlob = new Blob([''], { type: 'image/png' });
        const emptyFile = new File([emptyBlob], 'empty.png', { type: 'image/png' });
        formData.append('file', emptyFile);
        formData.append('thumbnail', dishData.thumbnail);
      }
      
      console.log("Sending update dish request with data:", {
        name: dishData.name,
        price: dishData.price,
        description: dishData.description,
        categoryName: dishData.categoryName,
        thumbnail: dishData.thumbnail,
        file: dishData.file
      });
      
      const response = await restaurantAxiosClient.put(`/dishes/${dishId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;
    } catch (error) {
      console.error('Lỗi khi cập nhật món ăn:', error);
      throw error;
    }
  },

  // Xóa món ăn
  deleteDish: async (dishId) => {
    try {
      const response = await restaurantAxiosClient.delete(`/dishes/${dishId}`);
      return response;
    } catch (error) {
      console.error('Lỗi khi xóa món ăn:', error);
      throw error;
    }
  },

  // Thay đổi trạng thái món ăn (AVAILABLE/UNAVAILABLE)
  toggleDishStatus: async (dishId, status) => {
    try {
      console.log("Sending update dish status request for dish:", dishId, "new status:", status);
      
      // Gửi status trong một object với key là status
      const data = { status };
      console.log("Request body:", data);
      
      const response = await restaurantAxiosClient.patch(`/dishes/${dishId}`, data);
      
      console.log("Update dish status response:", response);
      return response;
    } catch (error) {
      console.error('Lỗi khi thay đổi trạng thái món ăn:', error);
      throw error;
    }
  }
};
