'use client';

import { usePathname } from 'next/navigation';

import { UserLayout } from '@/components';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if this is home page (including locale paths like /en, /ja, /vi)
  const isHomePage =
    pathname === '/' || pathname.match(/^\/[a-z]{2}$/) || pathname.match(/^\/[a-z]{2}\/$/);

  return <UserLayout usePinnedHeader={!isHomePage}>{children}</UserLayout>;
}
