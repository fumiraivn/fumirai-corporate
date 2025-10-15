import { PropsWithChildren, useEffect, useMemo, useRef } from 'react';

import Image from 'next/image';

import styles from './styles.module.scss';

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon?: string; // public path under /public
};

export type OurServicesProps = PropsWithChildren<{
  data?: ServiceItem[];
  position?: 'left' | 'right' | 'center';
}>;

export default function OurServices({ data = [] }: OurServicesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const directionClassByIndex = useMemo<(index: number) => string>(() => {
    // Cycle directions: left, right, bottom
    return (index: number) => {
      const mod = index % 3;
      if (mod === 0) return styles.fromLeft;
      if (mod === 1) return styles.fromRight;
      return styles.fromBottom;
    };
  }, []);

  useEffect(() => {
    if (!cardRefs.current?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // add inView with a small stagger based on data-index
            const indexAttr = target.getAttribute('data-index');
            const index = indexAttr ? parseInt(indexAttr, 10) : 0;
            const delayMs = Math.min(index * 120, 600);
            setTimeout(() => {
              target.classList.add(styles.inView);
            }, delayMs);
            observer.unobserve(target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15,
      },
    );

    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data.length]);

  return (
    <div className={styles.ourServices} ref={containerRef}>
      <div className={styles.grid}>
        {data.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            data-index={index}
            className={`${styles.card} ${directionClassByIndex(index)}`}
          >
            {item.icon ? (
              <div className={styles.iconWrapper}>
                <Image src={item.icon} alt={item.title} width={40} height={40} />
              </div>
            ) : null}
            <h4 className={styles.cardTitle}>{item.title}</h4>
            <p className={styles.cardDesc}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
