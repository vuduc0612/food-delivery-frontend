import axiosClient from './axiosClient';

export const loginApi = async (email, password) => {
  const response = await axiosClient.post(`/auth/customer/login`, {
    email,
    password,
  });
  console.log("Login Response:", response);
  return response;
};

export const registerApi = async (userData) => {
  const response = await axiosClient.post(`/auth/customer/register`, {
    email: userData.email,
    fullName: userData.fullName,
    phoneNumber: userData.phoneNumber,
    password: userData.password
  });
  return response;
};

export const verifyOtpApi = async (userData, otp) => {
  const response = await axiosClient.post(`/auth/customer/verify-otp?otp=${otp}`, {
    email: userData.email,
    fullName: userData.fullName,
    phoneNumber: userData.phoneNumber,
    password: userData.password
  });
  return response;
};

export const resendOtpApi = async (email) => {
  const response = await axiosClient.post(`/auth/customer/resend-otp`, {
    email
  });
  return response;
};

export const getProfile = async () => {
  const response = await axiosClient.get(`/users/me`);
  return response;
};

export const forgotPasswordApi = async (email) => {
  const response = await axiosClient.post(`/auth/forgot-password`, {
    email
  });
  return response;
};

export const verifyResetPasswordOtpApi = async (email, otpCode) => {
  const response = await axiosClient.post(`/auth/verify-reset-password-otp`, {
    email,
    otpCode
  });
  return response;
};

export const resetPasswordApi = async (email, otpCode, newPassword) => {
  const response = await axiosClient.post(`/auth/reset-password`, {
    email,
    otpCode,
    newPassword
  });
  return response;
};
