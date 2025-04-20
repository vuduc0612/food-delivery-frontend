import axiosClient from "../clients/axiosClient";
export const calculateDeliveryFee = async (from, to) => {
    try {
      const response = await axiosClient.post('/delivery/fee', {
        from,
        to
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      console.error('Lỗi tính phí:', error);
      return 20000; // fallback
    }
};
  