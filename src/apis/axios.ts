import axios from 'axios';

const API_BASE_URL = process.env.MICRO_CMS_API_BASE_URL || 'https://timohuynh.microcms.io/api/v1/';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: { startTime: Date };
    cacheKey?: string;
    skipCache?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-MICROCMS-API-KEY': process.env.MICRO_CMS_API_KEY || '',
    // prevent intermediary caches
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    Pragma: 'no-cache',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };

    // Cache disabled: still compute cacheKey for future flexibility
    if (config.method === 'get') {
      config.cacheKey = `${config.url}?${JSON.stringify(config.params || {})}`;
    }

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
    // Skip logging for cached responses
    if (error && typeof error === 'object' && 'isCached' in error) {
      return Promise.reject(error);
    }

    // Only log errors that are not handled by the calling function
    // Skip logging for common expected errors (404, 401, 403, timeout)
    const status = error.response?.status;
    const isExpectedError = status === 404 || status === 401 || status === 403;
    const isTimeoutError = error.code === 'ECONNABORTED';

    if (!isExpectedError && !isTimeoutError) {
      // Only log unexpected errors
      if (status === 401) {
        console.error('Unauthorized access - check API key');
      } else if (status >= 500) {
        console.error('Server error:', error.response?.data);
      } else {
        console.error('Unexpected API error:', error.message);
      }
    }

    // Always reject the error so the wrapper can handle it
    return Promise.reject(error);
  },
);

export default axiosInstance;
