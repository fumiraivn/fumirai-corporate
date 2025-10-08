export default async function getRequestConfig({
  locale,
  requestLocale,
}: {
  locale?: string;
  requestLocale?: () => Promise<string | undefined>;
}) {
  const resolved = locale || (requestLocale ? await requestLocale() : undefined) || 'vi';
  const messages = (await import(`./src/i18n/messages/${resolved}.json`)).default;
  return {
    locale: resolved,
    messages,
  };
}
