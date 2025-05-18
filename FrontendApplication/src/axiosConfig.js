// src/axiosConfig.js
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8080';

// Add request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth') 
      ? JSON.parse(localStorage.getItem('auth')).token 
      : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;