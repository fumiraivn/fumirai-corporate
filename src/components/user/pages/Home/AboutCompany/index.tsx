'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';

export type CompanyInfo = {
  label: string;
  value: string;
};

export type AboutCompanyProps = {
  companyInfo: CompanyInfo[];
};

export default function AboutCompany({ companyInfo }: AboutCompanyProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset animation by first hiding, then showing
          setIsVisible(false);
          setTimeout(() => {
            setIsVisible(true);
          }, 50);
        } else {
          // Hide when out of view to prepare for next animation
          setIsVisible(false);
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
      if (currentRef) {
        observer.unobserve(currentRef);
      }
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
    </div>
  );
}
