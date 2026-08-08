import axiosInstance from './axiosInstance';

export const authAPI = {
  login: (data: { email: string; password: string }) => 
    axiosInstance.post('/auth/login', data),
  
  register: (data: { fullName: string; email: string; password: string }) => 
    axiosInstance.post('/auth/register', data),
  
  forgotPassword: (data: { email: string }) => 
    axiosInstance.post('/auth/forgot-password', data),
};
