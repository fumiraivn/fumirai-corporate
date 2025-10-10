import { usePathname, useRouter } from 'next/navigation';

import { type AppLocale, SUPPORTED_LOCALES } from '@/i18n/request';

import { useLocale } from 'next-intl';

export function useLocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (newLocale: string) => {
    // Validate the new locale
    if (!SUPPORTED_LOCALES.includes(newLocale as AppLocale)) {
      return;
    }

    // Create new pathname with new locale
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace the locale segment
    const newPathname = segments.join('/');

    router.push(newPathname);
  };

  const getCurrentLocale = () => locale;

  const isCurrentLocale = (targetLocale: string) => locale === targetLocale;

  return {
    currentLocale: locale,
    switchLocale,
    getCurrentLocale,
    isCurrentLocale,
  };
}
