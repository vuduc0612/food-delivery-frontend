import axios from 'axios';
import { API_URL } from '../config';

export const loginApi = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/customer/login`, {
    email,
    password,
  });
  return response.data;
};

export const registerApi = async (email, password) => {
  await axios.post(`${API_URL}/auth/customer/register`, {
    email,
    password,
  });
};

export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/users/me`);
  return response.data;
};
