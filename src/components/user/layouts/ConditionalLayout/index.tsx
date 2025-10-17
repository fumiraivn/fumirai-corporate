'use client';

import { usePathname } from 'next/navigation';

import { UserLayout } from '@/components';
import { BlockContent, CommonContentLanguages, ELanguage } from '@/types';

import { useLocale } from 'next-intl';

interface ConditionalLayoutProps {
  children: React.ReactNode;
  commonData?: CommonContentLanguages | null;
  bannerData?: BlockContent | null;
}

export default function ConditionalLayout({
  children,
  commonData,
  bannerData,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const locale = useLocale();

  // Check if this is home page (including locale paths like /en, /ja, /vi)
  const isHomePage =
    pathname === '/' || pathname.match(/^\/[a-z]{2}$/) || pathname.match(/^\/[a-z]{2}\/$/);

  return (
    <UserLayout
      usePinnedHeader={!isHomePage}
      locale={locale as ELanguage}
      commonData={commonData}
      bannerData={bannerData}
    >
      {children}
    </UserLayout>
  );
}
