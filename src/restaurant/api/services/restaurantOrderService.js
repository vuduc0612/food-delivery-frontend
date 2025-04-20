import restaurantAxiosClient from "../clients/restaurantAxiosClient";

export const restaurantOrderService = {
  // Lấy danh sách đơn hàng của nhà hàng
  getOrders: async () => {
    try {
      const response = await restaurantAxiosClient.get(
        "/orders/restaurants/me"
      );

      return response;
    } catch (error) {
      throw new Error(
        error.message || "Có lỗi xảy ra khi lấy danh sách đơn hàng"
      );
    }
  },

  // Lấy danh sách đơn hàng của nhà hàng với phân trang
  getOrdersWithPagination: async (page = 0, limit = 10, status = null, searchTerm = '') => {
    try {
      let url = `/orders/restaurants/me?page=${page}&limit=${limit}`;
      
      if (status && status !== 'all') {
        url += `&status=${status}`;
      }
      
      if (searchTerm) {
        url += `&search=${searchTerm}`;
      }
      console.log("URL:", url);
      const response = await restaurantAxiosClient.get(url);
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Có lỗi xảy ra khi lấy danh sách đơn hàng"
      );
    }
  },

  // Lấy chi tiết đơn hàng theo ID
  getOrderById: async (orderId) => {
    try {
      const response = await restaurantAxiosClient.get(`/orders/${orderId}`);
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Có lỗi xảy ra khi lấy chi tiết đơn hàng"
      );
    }
  },

  // Cập nhật trạng thái đơn hàng
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await restaurantAxiosClient.put(`/orders/${orderId}`, {
        status: status.toUpperCase(),
      });
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Có lỗi xảy ra khi cập nhật trạng thái đơn hàng"
      );
    }
  },

  // Tìm kiếm đơn hàng
  searchOrders: async (searchTerm) => {
    try {
      const response = await restaurantAxiosClient.get(
        `/restaurant/orders/search`,
        {
          params: { q: searchTerm },
        }
      );
      return response;
    } catch (error) {
      throw new Error(
        error.message || "Có lỗi xảy ra khi tìm kiếm đơn hàng"
      );
    }
  },

  // Lọc đơn hàng theo trạng thái
};

export default restaurantOrderService;
