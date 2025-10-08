import { cookies } from 'next/headers';

export const DEFAULT_LOCALE = 'vi';
export const SUPPORTED_LOCALES = ['vi', 'en'] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export async function getRequestLocale(): Promise<AppLocale> {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get('locale')?.value;
  if (fromCookie && SUPPORTED_LOCALES.includes(fromCookie as AppLocale)) {
    return fromCookie as AppLocale;
  }
  // Fallback to default for now; can parse Accept-Language later
  return DEFAULT_LOCALE;
}

export default async function getRequestConfig({
  locale,
  requestLocale,
}: {
  locale?: string;
  requestLocale?: Promise<string | undefined> | (() => Promise<string | undefined>);
}) {
  const resolved = (locale ||
    (requestLocale
      ? typeof requestLocale === 'function'
        ? await requestLocale()
        : await requestLocale
      : undefined) ||
    DEFAULT_LOCALE) as AppLocale;
  const messages = (await import(`./messages/${resolved}.json`)).default;
  return {
    locale: resolved,
    messages,
  };
}
