import { NextRequest, NextResponse } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './i18n/request';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: SUPPORTED_LOCALES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,

  // Always show the locale in the URL
  localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
  // Handle root path redirect
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  // Use next-intl middleware for other paths
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(vi|en|ja)/:path*'],
};
