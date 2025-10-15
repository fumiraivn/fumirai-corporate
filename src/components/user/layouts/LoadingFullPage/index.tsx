'use client';

import { useEffect, useState } from 'react';

import { Logo } from '@/components/base';

import styles from './styles.module.scss';

export default function LoadingFullPage() {
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const minTime = 1200; // minimal brand exposure time
    const start = Date.now();

    const done = async () => {
      try {
        type DocWithFonts = Document & { fonts?: { ready: Promise<unknown> } };
        await (document as DocWithFonts).fonts?.ready;
      } catch {}
      const remain = Math.max(0, minTime - (Date.now() - start));
      setTimeout(() => {
        setIsFading(true);
        setTimeout(() => setIsHidden(true), 600);
      }, remain);
    };

    done();
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted || isHidden) return null;

  return (
    <div className={`${styles.loadingContainer} ${isFading ? styles.fadeOut : ''}`}>
      <div className={styles.gradientBackground}></div>
      <div className={styles.vignette}></div>
      <Logo width={50} height={50} className={styles.logo} />
    </div>
  );
}
