import '@ant-design/v5-patch-for-react-19';

import { Geist_Mono, Noto_Sans, Noto_Sans_JP } from 'next/font/google';
import { notFound } from 'next/navigation';

import { getCommon } from '@/apis';
import { BackToTop, ConditionalLayout } from '@/components';
import LoadingFullPage from '@/components/user/layouts/LoadingFullPage';
import { getMessages } from '@/i18n';
import { SUPPORTED_LOCALES } from '@/i18n/request';
import { ELanguage } from '@/types';

import { App as AntdApp, ConfigProvider, theme as antdTheme } from 'antd';
import 'antd/dist/reset.css';
import enUS from 'antd/locale/en_US';
import jaJP from 'antd/locale/ja_JP';
import viVN from 'antd/locale/vi_VN';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

import '../globals.css';

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fumirai Corporate',
  description: 'Fumirai Corporate Website',
  icons: {
    icon: '/favicon.ico',
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!SUPPORTED_LOCALES.includes(locale as ELanguage)) notFound();

  const messages = getMessages(locale);
  const antdLocaleMap = {
    [ELanguage.VI]: viVN,
    [ELanguage.JA]: jaJP,
    [ELanguage.EN]: enUS,
  } as const;
  const antdLocale = antdLocaleMap[locale as ELanguage] ?? jaJP;

  let commonData = null;
  commonData = await getCommon(locale as ELanguage);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${notoSans.variable} ${notoSansJP.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ConfigProvider locale={antdLocale} theme={{ algorithm: antdTheme.defaultAlgorithm }}>
            <AntdApp>
              <LoadingFullPage locale={locale as ELanguage} />
              <ConditionalLayout commonData={commonData}>{children}</ConditionalLayout>
              <BackToTop />
            </AntdApp>
          </ConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
