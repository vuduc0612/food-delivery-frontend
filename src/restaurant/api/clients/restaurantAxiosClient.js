import axios from 'axios';
import { API_URL } from '../../../config';
import { getRestaurantAuthToken } from '../../../shared/utils/restaurantAuthToken';

const restaurantAxiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
restaurantAxiosClient.interceptors.request.use(
  (config) => {
    const token = getRestaurantAuthToken();
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
restaurantAxiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('Restaurant API Error:', error.response?.data || error);
    return Promise.reject(error.response?.data || error);
  }
);

export default restaurantAxiosClient;
