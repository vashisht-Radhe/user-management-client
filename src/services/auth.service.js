import api from "./api";

const BASE_URL = "/auth";

export const login = (data) => api.post(`${BASE_URL}/login`, data);

export const register = (data) => api.post(`${BASE_URL}/register`, data);

export const logout = () => api.post(`${BASE_URL}/logout`);

export const verifyOtp = (otp) => api.post(`${BASE_URL}/verify-otp`, { otp });

export const resendOtp = () => api.post(`${BASE_URL}/resend-otp`);

export const forgotPassword = (email) =>
  api.post(`${BASE_URL}/forgot-password`, { email });

export const resetPassword = (token, newPassword) =>
  api.post(`${BASE_URL}/reset-password`, { token, newPassword });
