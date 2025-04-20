import Cookies from 'js-cookie';
import { AUTH_TOKEN_NAME_RESTAURANT } from '../../config';
const now = new Date();
const expires = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes

export const setRestaurantAuthToken = (token) => {
  Cookies.set(AUTH_TOKEN_NAME_RESTAURANT, token, {
    expires: expires, 
    secure: true,
    sameSite: 'Strict',
    path: '/',
  });
  console.log("Token set:", token);
  // Không cần thay đổi axios.defaults.headers ở đây
  // Chúng ta sẽ xử lý token trong các request của nhà hàng riêng biệt
};

export const removeRestaurantAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_NAME_RESTAURANT);
};

export const getRestaurantAuthToken = () => {
  return Cookies.get(AUTH_TOKEN_NAME_RESTAURANT);
};
