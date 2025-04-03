

import axiosClient from './axiosClient';

export const loginApi = async (email, password) => {
  const response = await axiosClient.post(`/auth/customer/login`, {
    email,
    password,
  });
  console.log("Login Response:", response);
  return response;
};

export const registerApi = async (email, password) => {
  const response = await axiosClient.post(`/auth/customer/register`, {
    email,
    password,
  });
  //console.log("Register Response:", response);
  return response;
};

export const getProfile = async () => {
  const response = await axiosClient.get(`/users/me`);
  return response;
};
