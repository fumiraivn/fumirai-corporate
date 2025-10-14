import { ELanguage } from '@/types';
import { API_ENDPOINTS } from '@/utils/constant';

import axiosInstance from '../axios';

export interface HomeData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface CmsApiResponse<T = unknown> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

/**
 * Fetch home data from the API
 * @param locale - The locale for the API endpoint (e.g., 'vi', 'en', 'ja')
 * @returns Promise<CmsApiResponse<HomeData>>
 */
export const getHomeData = async (
  locale: ELanguage = ELanguage.JA,
): Promise<CmsApiResponse<HomeData>> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.HOME(locale));
    return response.data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};

/**
 * Fetch home data from the API
 * @param locale - The locale for the API endpoint (e.g., 'vi', 'en', 'ja')
 * @returns Promise<any>
 */
export const getCommon = async (locale: ELanguage = ELanguage.JA): Promise<CmsApiResponse> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.COMMON(locale));
    return response.data;
  } catch (error) {
    console.error('Error fetching common data:', error);
    throw error;
  }
};
