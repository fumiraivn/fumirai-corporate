import axios from 'axios';

const API_BASE_URL = process.env.MICRO_CMS_API_BASE_URL || 'https://timohuynh.microcms.io/api/v1/';

// Simple in-memory cache for API responses
const responseCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Extend axios config interface
declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: { startTime: Date };
    cacheKey?: string;
  }
}

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
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };

    // Check cache for GET requests
    if (config.method === 'get') {
      const cacheKey = `${config.url}?${JSON.stringify(config.params || {})}`;
      const cached = responseCache.get(cacheKey);

      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        // Return cached response
        return Promise.reject({
          isCached: true,
          data: cached.data,
          config,
        });
      }

      // Store cache key for response interceptor
      config.cacheKey = cacheKey;
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
    // Log successful requests in development
    if (process.env.NODE_ENV === 'development') {
      const duration = new Date().getTime() - (response.config.metadata?.startTime?.getTime() || 0);
      console.log(
        `✅ API ${response.config.method?.toUpperCase()} ${response.config.url} - ${duration}ms`,
      );
    }

    // Cache GET responses
    if (response.config.method === 'get' && response.config.cacheKey) {
      responseCache.set(response.config.cacheKey, {
        data: response.data,
        timestamp: Date.now(),
      });
    }

    return response;
  },
  (error) => {
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
