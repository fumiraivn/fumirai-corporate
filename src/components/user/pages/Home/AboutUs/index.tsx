'use client';

import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';

export default function AboutUs() {
  const t = useTranslations('homePage.aboutUs');
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.aboutUs} ${isVisible ? styles.animateIn : styles.animateOut}`}
    >
      <p className={styles.lead}>{t('lead')}</p>
      <div className={styles.grid}>
        <p className={styles.paragraph}>{t('p1')}</p>
        <p className={styles.paragraph}>{t('p2')}</p>
        <p className={styles.paragraph}>{t('p3')}</p>
      </div>
    </div>
  );
}
