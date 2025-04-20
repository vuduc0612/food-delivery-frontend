import axiosClient from '../clients/axiosClient';

export const orderService = {
  createOrder: async (orderData) => {
    try {
      console.log("Order data", orderData);
      const response = await axiosClient.post('/orders', orderData);
      // console.log("API place order", response);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.message || 'Có lỗi xảy ra khi tạo đơn hàng');
    }
  },

  createPayment: async (orderData) => {
    try {
      console.log("Payement data", orderData);
      const response = await axiosClient.post('/payments/vnpay', orderData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.message || 'Có lỗi xảy ra khi tạo URL thanh toán');
    }
  },


  callbackPayment: async (paymentData) => {
    try {
      console.log("Payment data callback", paymentData);
      const response = await axiosClient.get('/payments/callback-payment', { params: paymentData });
      return response;
    } catch (error) {
      throw new Error(error.response?.message || 'Có lỗi xảy ra khi xử lý thanh toán');
    }
  },

  getOrderById: async (id) => {
    try {
      const response = await axiosClient.get(`/orders/${id}`);
      // console.log('Chi tiết đơn hàng:', response);
      return response;
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
      throw new Error('Không thể lấy thông tin đơn hàng. Vui lòng thử lại sau.');
    }
  },

  getOrdersByUserCurrent: async () => {
    try {
      const response = await axiosClient.get(`/orders/users/me`);
      // console.log(response);
      return response;
    } catch (error) {
      throw new Error(error.response?.message || 'Có lỗi xảy ra khi lấy danh sách đơn hàng');
    }
  },
  
  getOrdersWithPagination: async (page = 0, limit = 10, status = null) => {
    try {
      let url = `/orders/users/me?page=${page}&limit=${limit}`;
      if (status) {
        url += `&status=${status}`;
      }
      const response = await axiosClient.get(url);
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