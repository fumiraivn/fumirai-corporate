import axios from 'axios';

const API_BASE_URL = process.env.MICRO_CMS_API_BASE_URL || 'https://timohuynh.microcms.io/api/v1/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-MICROCMS-API-KEY': process.env.MICRO_CMS_API_KEY || '',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any authentication headers or other request modifications here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access');
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.response?.data);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
