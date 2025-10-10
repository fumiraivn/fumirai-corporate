import { type AppLocale, DEFAULT_LOCALE, SUPPORTED_LOCALES } from './src/i18n/request';

export default async function getRequestConfig({ locale }: { locale?: string }) {
  // Validate the locale parameter
  const resolved = SUPPORTED_LOCALES.includes(locale as AppLocale) ? locale : DEFAULT_LOCALE;

  const messages = (await import(`./src/i18n/messages/${resolved}.json`)).default;
  return {
    locale: resolved,
    messages,
  };
}
