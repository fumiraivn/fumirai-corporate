import { ELanguage } from '@/types';

export const DEFAULT_LOCALE = ELanguage.JA;
export const SUPPORTED_LOCALES = [ELanguage.VI, ELanguage.EN, ELanguage.JA] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

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
