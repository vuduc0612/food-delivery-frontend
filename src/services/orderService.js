import axiosClient from './axiosClient';

export const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await axiosClient.post('/orders', orderData);
      console.log("API place order", response);
      return response;
    } catch (error) {
      throw new Error(error.response?.message || 'Có lỗi xảy ra khi tạo đơn hàng');
    }
  },

  createPayment: async (orderData) => {
    try {
      const response = await axiosClient.post('/payments/vnpay', orderData);
      return response;
    } catch (error) {
      throw new Error(error.response?.message || 'Có lỗi xảy ra khi tạo URL thanh toán');
    }
  },

  callbackPayment: async (paymentData) => {
    try {
      const response = await axiosClient.get('/payments/callback-payment', { params: paymentData });
      return response;
    } catch (error) {
      throw new Error(error.response?.message || 'Có lỗi xảy ra khi xử lý thanh toán');
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await axiosClient.get(`/orders/${orderId}`);
      return response;
    } catch (error) {
      throw new Error(error.response?.message || 'Có lỗi xảy ra khi lấy thông tin đơn hàng');
    }
  },

  getOrdersByUser: async () => {
    try {
      const response = await axiosClient.get('/orders/user');
      return response;
    } catch (error) {
      throw new Error(error.response?.message || 'Có lỗi xảy ra khi lấy danh sách đơn hàng');
    }
  },

  applyPromoCode: async (code) => {
    try {
      const response = await axiosClient.post('/orders/promo', { code });
      return response;
    } catch (error) {
      throw new Error(error.response?.message || 'Mã giảm giá không hợp lệ');
    }
  }
}; 