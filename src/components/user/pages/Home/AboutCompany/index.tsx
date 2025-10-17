'use client';

import { useEffect, useRef, useState } from 'react';

import Map from '../Map';

import styles from './styles.module.scss';

export type AboutCompanyProps = {
  htmlItems: string[];
  mapUrl?: string;
  embedAddress?: string;
  mapHeight?: number;
};

export default function AboutCompany({
  htmlItems,
  mapUrl,
  embedAddress,
  mapHeight,
}: AboutCompanyProps) {
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimatedRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const combinedHtml = htmlItems.join('');

  return (
    <div
      ref={ref}
      className={`${styles.aboutCompany} ${isVisible ? styles.animateIn : styles.animateOut}`}
    >
      <div className={styles.companyInfo} dangerouslySetInnerHTML={{ __html: combinedHtml }} />

      {mapUrl || embedAddress ? (
        <div className={styles.mapBlock}>
          <Map address={embedAddress || ''} mapUrl={mapUrl} height={mapHeight} />
        </div>
      ) : null}
    </div>
  );
}
