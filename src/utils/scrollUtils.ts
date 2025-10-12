/**
 * Utility functions for smooth scrolling
 */

export const scrollToElement = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const scrollToSection = (sectionId: string) => {
  if (sectionId === 'home') {
    scrollToTop();
  } else {
    // Add some offset to account for fixed header
    scrollToElement(sectionId, 80);
  }
};
