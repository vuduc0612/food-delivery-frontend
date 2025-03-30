import Cookies from 'js-cookie';
import axios from 'axios';
import { AUTH_TOKEN_NAME } from '../config';


export const setAuthToken = (token) => {
  Cookies.set(AUTH_TOKEN_NAME, token, {
    expires: 1, // 1 ngày
    secure: true,
    sameSite: 'Strict',
    path: '/',
  });

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_NAME);
  delete axios.defaults.headers.common['Authorization'];
};

export const getAuthToken = () => {
  return Cookies.get(AUTH_TOKEN_NAME);
};
