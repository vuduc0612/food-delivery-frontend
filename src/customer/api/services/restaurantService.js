import axiosClient from "../clients/axiosClient";
export const fetchRestaurantById = async (id) => {
  try {
    const response = await axiosClient.get(`/restaurants/${id}`);
    //console.log("Restaurants API Response:", response.data);
    return response;
  } catch (error) {
    console.error("Get Restaurants Error:", error);
    throw error;
  }
};


export const fetchRestaurants = async (page = 0, limit = 8, keyword = '') => {
  try {
    const response = await axiosClient.get(`/restaurants?page=${page}&limit=${limit}&keyword=${keyword}`);
    //console.log("Restaurants Pagination API Response:", response);
    return response;
  } catch (error) {
    console.error("Get Restaurants with Pagination Error:", error);
    throw error;
  }
};
