import axiosClient from "./axiosClient";
export const calculateDeliveryFee = async (from, to) => {
    try {
      const response = await axiosClient.post('/delivery/fee', {
        from,
        to
      });
      // console.log(response);
      return response;
    } catch (error) {
      console.error('Lỗi tính phí:', error);
      return 20000; // fallback
    }
};
  