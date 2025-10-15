import { ELanguage } from '@/types';
import { API_ENDPOINTS } from '@/utils/constant';

import { apiGet } from '../apiWrapper';

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
 * @returns Promise<CmsApiResponse<HomeData> | null>
 */
export const getHomeData = async (
  locale: ELanguage = ELanguage.JA,
): Promise<CmsApiResponse<HomeData> | null> => {
  return apiGet<CmsApiResponse<HomeData>>(API_ENDPOINTS.HOME(locale), 'home data', locale);
};

/**
 * Fetch common data from the API
 * @param locale - The locale for the API endpoint (e.g., 'vi', 'en', 'ja')
 * @returns Promise<CmsApiResponse | null>
 */
export const getCommon = async (
  locale: ELanguage = ELanguage.JA,
): Promise<CmsApiResponse | null> => {
  return apiGet<CmsApiResponse>(API_ENDPOINTS.COMMON(locale), 'common data', locale);
};
