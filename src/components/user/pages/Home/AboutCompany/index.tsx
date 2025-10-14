'use client';

import { useEffect, useRef, useState } from 'react';

import Map from '../Map';

import styles from './styles.module.scss';

export type CompanyInfo = {
  label: string;
  value: string;
};

export type AboutCompanyProps = {
  companyInfo: CompanyInfo[];
  mapUrl?: string; // external link to open Google Maps
  embedAddress?: string; // address text for embedding in iframe
  mapHeight?: number;
};

export default function AboutCompany({
  companyInfo,
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

  return (
    <div
      ref={ref}
      className={`${styles.aboutCompany} ${isVisible ? styles.animateIn : styles.animateOut}`}
    >
      <div className={styles.companyInfo}>
        {companyInfo.map((info, index) => (
          <div
            key={index}
            className={`${styles.infoItem} ${isVisible ? styles.itemAnimateIn : styles.itemAnimateOut}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className={styles.label}>{info.label}:</span>
            <span className={styles.value}>{info.value}</span>
          </div>
        ))}
      </div>

      {embedAddress ? (
        <div className={styles.mapBlock}>
          <Map address={embedAddress} mapUrl={mapUrl} height={mapHeight} />
        </div>
      ) : null}
    </div>
  );
}
