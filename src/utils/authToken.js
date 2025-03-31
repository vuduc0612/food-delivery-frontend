import Cookies from 'js-cookie';
import axios from 'axios';
import { AUTH_TOKEN_NAME } from '../config';
const now = new Date();
const expires = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes

export const setAuthToken = (token) => {
  Cookies.set(AUTH_TOKEN_NAME, token, {
    expires: expires, 
    secure: true,
    sameSite: 'Strict',
    path: '/',
  });

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //console.log("Set Auth Token:", token);
};

export const removeAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_NAME);
  delete axios.defaults.headers.common['Authorization'];
};

export const getAuthToken = () => {
  return Cookies.get(AUTH_TOKEN_NAME);
};
