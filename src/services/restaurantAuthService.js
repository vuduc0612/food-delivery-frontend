import restaurantAxiosClient from './restaurantAxiosClient';

// Đăng nhập nhà hàng
export const loginRestaurantApi = async (email, password) => {
  const response = await restaurantAxiosClient.post('/auth/restaurant/login', {
    email,
    password
  });
  console.log("Login Response:", response)
  return response;
};

// Đăng ký nhà hàng
export const registerRestaurantApi = async (restaurantData) => {
  const response = await restaurantAxiosClient.post('/auth/restaurant/register', restaurantData);
  return response;
};

// Lấy thông tin profile nhà hàng
export const getRestaurantProfile = async () => {
  return await restaurantAxiosClient.get('/restaurants/profile');
};

// Quên mật khẩu
export const forgotPasswordRestaurant = async (email) => {
  return await restaurantAxiosClient.post('/auth/restaurant/forgot-password', { email });
};

// Đặt lại mật khẩu
export const resetPasswordRestaurant = async (token, newPassword) => {
  return await restaurantAxiosClient.post('/auth/restaurant/reset-password', { 
    token, 
    newPassword 
  });
};
