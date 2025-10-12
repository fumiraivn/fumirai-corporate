import { cookies } from 'next/headers';

import { COOKIE_KEYS } from '@/utils/constant';

import { type AppLocale, DEFAULT_LOCALE, SUPPORTED_LOCALES } from './request';

export async function getRequestLocale(): Promise<AppLocale> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(COOKIE_KEYS.LOCALE)?.value;
  if (fromCookie && SUPPORTED_LOCALES.includes(fromCookie as AppLocale)) {
    return fromCookie as AppLocale;
  }
  // Fallback to default for now; can parse Accept-Language later
  return DEFAULT_LOCALE;
}
