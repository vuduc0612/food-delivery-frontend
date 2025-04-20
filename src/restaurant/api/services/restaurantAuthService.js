import restaurantAxiosClient from "../clients/restaurantAxiosClient";

// Đăng nhập nhà hàng
export const loginRestaurantApi = async (email, password) => {
  const response = await restaurantAxiosClient.post('/auth/restaurant/login', {
    email,
    password
  });
  console.log("Login Response:", response)
  return response.data;
};

// Đăng ký nhà hàng
export const registerRestaurantApi = async (restaurantData) => {
  const response = await restaurantAxiosClient.post('/auth/restaurant/register', restaurantData);
  return response.data;
};

// Lấy thông tin profile nhà hàng
export const getRestaurantProfile = async () => {
  const response = await restaurantAxiosClient.get('/restaurants/profile');
  return response.data;
};

