const COOKIE_KEYS = {
  LOCALE: 'locale',
};

const ROUTERS = {
  HOME: (locale: string) => `/${locale}`,
  RECRUITMENT: (locale: string) => `/${locale}/recruitment`,
  OUR_SERVICES: (locale: string) => `/${locale}#our-services`,
  ABOUT_US: (locale: string) => `/${locale}#about-us`,
  CUSTOMERS: (locale: string) => `/${locale}#customers`,
  TEAM_MEMBERS: (locale: string) => `/${locale}#team-members`,
};

const API_ENDPOINTS = {
  COMMON: (locale: string) => `common/${locale}`,
  HOME: (locale: string) => `pages/home-${locale}`,
};

export * from './scrollUtils';
export { API_ENDPOINTS, COOKIE_KEYS, ROUTERS };
