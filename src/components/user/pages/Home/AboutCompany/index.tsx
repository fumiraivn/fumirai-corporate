'use client';

import { useEffect, useRef, useState } from 'react';

import { ECompanySpecialLabel } from '@/types';

import Map from '../Map';

import styles from './styles.module.scss';

export type CompanyInfo = {
  label: string;
  value: string;
};

export type AboutCompanyProps = {
  companyInfo: CompanyInfo[];
  mapHeight?: number;
};

export default function AboutCompany({ companyInfo, mapHeight }: AboutCompanyProps) {
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

  // Extract map info from companyInfo rows: prefer label 'map_url' (case-insensitive), fallback to address-only embed
  const mapUrlRow = companyInfo
    .find((r) => r.label?.trim().toLowerCase() === ECompanySpecialLabel.MAP_URL)
    ?.value?.trim();
  const resolvedAddress =
    companyInfo
      .find((r) => r.label?.trim().toLowerCase() === ECompanySpecialLabel.EMBED_ADDRESS)
      ?.value?.trim() || '';

  return (
    <div
      ref={ref}
      className={`${styles.aboutCompany} ${isVisible ? styles.animateIn : styles.animateOut}`}
    >
      <div className={styles.companyInfo}>
        {companyInfo
          .filter((row) => {
            const key = row.label?.trim().toLowerCase();
            return (
              key !== ECompanySpecialLabel.MAP_URL && key !== ECompanySpecialLabel.EMBED_ADDRESS
            );
          })
          .map((info, index) => (
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

      {mapUrlRow || resolvedAddress ? (
        <div className={styles.mapBlock}>
          <Map address={resolvedAddress} mapUrl={mapUrlRow} height={mapHeight} />
        </div>
      ) : null}
    </div>
  );
}
