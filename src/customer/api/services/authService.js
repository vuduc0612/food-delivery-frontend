import axiosClient from '../clients/axiosClient';

export const loginApi = async (email, password) => {
  const response = await axiosClient.post(`/auth/customer/login`, {
    email,
    password,
  });
  console.log("Login Response:", response.data);
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await axiosClient.post(`/auth/customer/register`, {
    email: userData.email,
    fullName: userData.fullName,
    phoneNumber: userData.phoneNumber,
    password: userData.password
  });
  return response.data;
};

export const verifyOtpApi = async (userData, otp) => {
  const response = await axiosClient.post(`/auth/customer/verify-otp?otp=${otp}`, {
    email: userData.email,
    fullName: userData.fullName,
    phoneNumber: userData.phoneNumber,
    password: userData.password
  });
  return response.data;
};

export const resendOtpApi = async (email) => {
  const response = await axiosClient.post(`/auth/customer/resend-otp`, {
    email
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosClient.get(`/users/me`);
  return response.data;
};

export const forgotPasswordApi = async (email) => {
  const response = await axiosClient.post(`/auth/forgot-password`, {
    email
  });
  return response.data;
};

export const verifyResetPasswordOtpApi = async (email, otpCode) => {
  const response = await axiosClient.post(`/auth/verify-reset-password-otp`, {
    email,
    otpCode
  });
  return response.data;
};

export const resetPasswordApi = async (email, otpCode, newPassword) => {
  const response = await axiosClient.post(`/auth/reset-password`, {
    email,
    otpCode,
    newPassword
  });
  return response.data;
};
