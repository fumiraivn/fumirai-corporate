'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only scroll to top if there's no hash in the URL
    // If there's a hash, let useScrollToHash handle the scrolling
    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return null;
}
