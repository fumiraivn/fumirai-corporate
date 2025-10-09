'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import styles from './styles.module.scss';

export default function LoadingFullPage() {
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
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

  if (isHidden) return null;

  return (
    <div className={`${styles.loadingContainer} ${isFading ? styles.fadeOut : ''}`}>
      <div className={styles.gradientBackground}></div>
      <div className={styles.vignette}></div>
      <div className={styles.loadingContent}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="Fumirai Logo"
            width={240}
            height={240}
            className={styles.logo}
            priority
          />
        </div>
      </div>
    </div>
  );
}
