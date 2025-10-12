'use client';

import { useEffect } from 'react';

import { scrollToSection } from '@/utils/scrollUtils';

/**
 * Hook to handle scrolling to section based on URL hash
 * This is useful when navigating from other pages to home page with a specific section
 */
export const useScrollToHash = () => {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1); // Remove the # symbol
        // Use a longer timeout to ensure all components are rendered
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 300);
      }
    };

    // Handle initial load
    handleHashScroll();

    // Handle hash changes (in case user navigates with browser back/forward)
    window.addEventListener('hashchange', handleHashScroll);

    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);
};
