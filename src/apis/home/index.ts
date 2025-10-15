import { CommonContent, ELanguage } from '@/types';
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

export const getRecruitmentPage = async (
  locale: ELanguage = ELanguage.JA,
): Promise<unknown | null> => {
  return apiGet<unknown>(API_ENDPOINTS.RECRUITMENT(locale), 'recruitment page', locale);
};

/**
 * Fetch common data from the API
 * @param locale - The locale for the API endpoint (e.g., 'vi', 'en', 'ja')
 * @returns Promise<CommonContent | null>
 */
// caching disabled; keep only in-flight de-duplication
const inflight = new Map<string, Promise<CommonContent | null>>();

export const getCommon = async (
  locale: ELanguage = ELanguage.JA,
): Promise<CommonContent | null> => {
  const key = String(locale);

  // de-duplicate concurrent requests
  const existing = inflight.get(key);
  if (existing) return existing;

  const p = apiGet<CommonContent>(API_ENDPOINTS.COMMON(locale), 'common data', locale, {
    skipCache: true,
  })
    .then((data) => {
      inflight.delete(key);
      return data;
    })
    .catch((err) => {
      inflight.delete(key);
      throw err;
    });

  inflight.set(key, p);
  return p;
};

export const clearCommonCache = () => {};
