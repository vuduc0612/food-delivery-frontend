import Cookies from 'js-cookie';
import axios from 'axios';

const COOKIE_NAME = 'authToken';

export const setAuthToken = (token) => {
  Cookies.set(COOKIE_NAME, token, {
    expires: 7,
    secure: true,
    sameSite: 'Strict',
    path: '/',
  });

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  Cookies.remove(COOKIE_NAME);
  delete axios.defaults.headers.common['Authorization'];
};

export const getAuthToken = () => {
  return Cookies.get(COOKIE_NAME);
};
