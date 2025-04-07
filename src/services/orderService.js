import axiosClient from './axiosClient';

export const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await axiosClient.post('/orders', orderData);
      console.log("API place order", response);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi tạo đơn hàng');
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await axiosClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi lấy thông tin đơn hàng');
    }
  },

  getOrdersByUser: async () => {
    try {
      const response = await axiosClient.get('/orders/user');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách đơn hàng');
    }
  },

  applyPromoCode: async (code) => {
    try {
      const response = await axiosClient.post('/orders/promo', { code });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Mã giảm giá không hợp lệ');
    }
  }
}; 