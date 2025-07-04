

// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apibookingsaccomodations-production.up.railway.app', // cambia si tu API tiene otra URL base
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;