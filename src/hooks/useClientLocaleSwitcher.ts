'use client';

import { useCallback, useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { type AppLocale, SUPPORTED_LOCALES } from '@/i18n/request';

import { useLocale } from 'next-intl';

const LOCALE_STORAGE_KEY = 'fumirai-locale';

export function useClientLocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const serverLocale = useLocale();
  const [clientLocale, setClientLocale] = useState<AppLocale>(serverLocale as AppLocale);

  // Initialize and sync client locale with URL/server locale (source of truth)
  // Keep localStorage in sync but do NOT let it override the URL locale
  useEffect(() => {
    const urlLocale = serverLocale as AppLocale;
    setClientLocale(urlLocale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, urlLocale);
    } catch {}
  }, [serverLocale]);

  const switchLocale = useCallback(
    (newLocale: string) => {
      // Validate the new locale
      if (!SUPPORTED_LOCALES.includes(newLocale as AppLocale)) {
        return;
      }

      const appLocale = newLocale as AppLocale;

      // Update client state immediately (no reload)
      setClientLocale(appLocale);

      // Save to localStorage for persistence
      localStorage.setItem(LOCALE_STORAGE_KEY, appLocale);

      // Update URL without triggering reload
      const segments = pathname.split('/');
      segments[1] = newLocale;
      const newPathname = segments.join('/');

      // Use replace to update URL without adding to history
      router.replace(newPathname);
    },
    [pathname, router],
  );

  const getCurrentLocale = useCallback(() => clientLocale, [clientLocale]);

  const isCurrentLocale = useCallback(
    (targetLocale: string) => clientLocale === targetLocale,
    [clientLocale],
  );

  return {
    currentLocale: clientLocale,
    switchLocale,
    getCurrentLocale,
    isCurrentLocale,
  };
}
