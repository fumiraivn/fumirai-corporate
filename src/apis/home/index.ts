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

export interface HomeResponse {
  contents: HomeData[];
  totalCount: number;
  offset: number;
  limit: number;
}

/**
 * Fetch home data from the API
 * @param locale - The locale for the API endpoint (e.g., 'vi', 'en', 'ja')
 * @returns Promise<HomeResponse>
 */
export const getHomeData = async (locale: string = 'vi'): Promise<HomeResponse> => {
  try {
    const response = await axiosInstance.get(API_ENDPOINTS.HOME(locale));
    return response.data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};
