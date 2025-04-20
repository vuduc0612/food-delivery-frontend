import axios from 'axios';
import { API_URL } from '../../../config';
import { getAuthToken } from '../../../shared/utils/authToken';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    // console.log('Request Token:', token);
    // Nếu có token thì thêm vào headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Nếu response.data có data property thì trả về data
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error);
    return Promise.reject(error.response?.data || error);
  }
);

export default axiosClient; 