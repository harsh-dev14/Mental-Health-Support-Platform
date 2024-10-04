import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
});

// Request interceptor to include the JWT token in headers
api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    // Handle unauthorized errors globally
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;
