'use client';

import { useEffect, useState } from 'react';

import { ArrowUpIcon } from '@/svgs/user/HomeIcon';
import { scrollToTop } from '@/utils/scrollUtils';

import styles from './styles.module.scss';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleBackToTop = () => {
    scrollToTop();
  };

  return (
    <div
      onClick={handleBackToTop}
      className={`${styles.backToTopButton} ${isVisible ? styles.visible : ''}`}
      role="button"
      tabIndex={0}
      aria-label="Back to top"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleBackToTop();
        }
      }}
    >
      <ArrowUpIcon width={18} height={18} className={styles.arrowIcon} />
    </div>
  );
}
