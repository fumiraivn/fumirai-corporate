'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';

export type AboutUsProps = {
  title?: string;
  items?: string[];
};

export default function AboutUs({ title, items }: AboutUsProps) {
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

  const leadText = title ?? '';
  const paragraphs: string[] = items ?? [];

  return (
    <div
      ref={ref}
      className={`${styles.aboutUs} ${isVisible ? styles.animateIn : styles.animateOut}`}
    >
      <p className={styles.lead}>{leadText}</p>
      <div className={styles.grid}>
        {paragraphs.map((text, idx) => (
          <p key={idx} className={styles.paragraph}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
