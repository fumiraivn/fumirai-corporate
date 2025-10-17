import { PageData } from '@/types';
import { API_ENDPOINTS } from '@/utils/constant';

import { apiGet } from '../apiWrapper';

export const clearCommonCache = () => {};

export const getCommonLanguages = async (): Promise<unknown | null> => {
  return apiGet<unknown>(API_ENDPOINTS.COMMON_LANGUAGES, 'common languages');
};

export const getHomeLanguages = async (): Promise<PageData | null> => {
  return apiGet<PageData>(API_ENDPOINTS.HOME_LANGUAGES, 'home languages');
};

export const getRecruitmentLanguages = async (): Promise<PageData | null> => {
  return apiGet<PageData>(API_ENDPOINTS.RECRUITMENT_LANGUAGES, 'recruitment languages');
};
