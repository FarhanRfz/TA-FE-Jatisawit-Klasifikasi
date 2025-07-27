// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
  },
});

// Interceptor untuk menambahkan token dari localStorage ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani respons (opsional, misalnya logout saat 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Sesi kedaluwarsa. Silakan login ulang.');
      localStorage.removeItem('token'); // Opsional: hapus token saat 401
      // Anda bisa redirect ke halaman login di sini jika diperlukan
    }
    return Promise.reject(error);
  }
);

export default api;