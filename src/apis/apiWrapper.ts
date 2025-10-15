import axiosInstance from './axios';

/**
 * Generic API wrapper that handles common error cases
 * @param apiCall - The axios API call function
 * @param errorContext - Context for error logging (e.g., 'home data', 'common data')
 * @param locale - Locale for error messages
 * @returns Promise<T | null>
 */
export const apiWrapper = async <T>(
  apiCall: () => Promise<{ data: T }>,
  errorContext: string,
  locale?: string,
): Promise<T | null> => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error: unknown) {
    // Handle cached response
    if (error && typeof error === 'object' && 'isCached' in error) {
      const cachedError = error as { isCached: boolean; data: T };
      return cachedError.data;
    }

    console.error(`Error fetching ${errorContext}:`, error);

    // Handle specific error cases
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { status: number } };
      const status = axiosError.response?.status;

      if (status === 404) {
        console.warn(`${errorContext} not found${locale ? ` for locale: ${locale}` : ''}`);
        return null;
      }

      if (status === 401 || status === 403) {
        console.error('API authentication failed');
        return null;
      }

      if (status && status >= 500) {
        console.error(`Server error (${status}) for ${errorContext}`);
        return null;
      }
    }

    if (error && typeof error === 'object' && 'code' in error) {
      const networkError = error as { code: string };
      if (networkError.code === 'ECONNABORTED') {
        console.error('Request timeout');
        return null;
      }
    }

    // For other unexpected errors, still throw to maintain existing behavior
    console.error(`Unexpected error for ${errorContext}:`, error);
    throw error;
  }
};

/**
 * GET request wrapper
 * @param url - API endpoint URL
 * @param errorContext - Context for error logging
 * @param locale - Locale for error messages
 * @returns Promise<T | null>
 */
export const apiGet = async <T>(
  url: string,
  errorContext: string,
  locale?: string,
): Promise<T | null> => {
  return apiWrapper(() => axiosInstance.get(url), errorContext, locale);
};

/**
 * POST request wrapper
 * @param url - API endpoint URL
 * @param data - Request data
 * @param errorContext - Context for error logging
 * @returns Promise<T | null>
 */
export const apiPost = async <T>(
  url: string,
  data: unknown,
  errorContext: string,
): Promise<T | null> => {
  return apiWrapper(() => axiosInstance.post(url, data), errorContext);
};

/**
 * PUT request wrapper
 * @param url - API endpoint URL
 * @param data - Request data
 * @param errorContext - Context for error logging
 * @returns Promise<T | null>
 */
export const apiPut = async <T>(
  url: string,
  data: unknown,
  errorContext: string,
): Promise<T | null> => {
  return apiWrapper(() => axiosInstance.put(url, data), errorContext);
};

/**
 * DELETE request wrapper
 * @param url - API endpoint URL
 * @param errorContext - Context for error logging
 * @returns Promise<T | null>
 */
export const apiDelete = async <T>(url: string, errorContext: string): Promise<T | null> => {
  return apiWrapper(() => axiosInstance.delete(url), errorContext);
};
