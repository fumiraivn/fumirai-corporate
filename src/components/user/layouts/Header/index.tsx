'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Button, Container } from '@/components/base';
import { ButtonType } from '@/components/base/Button';
import { MenuIcon } from '@/svgs/user/HomeIcon';

import Banner from './Banner';
import CanvasBackground from './CanvasBackground';
import LanguageDropdown from './LanguageDropdown';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';
import styles from './styles.module.scss';

export default function Header() {
  const [isPinned, setIsPinned] = useState(false);
  const [isPinnedVisible, setIsPinnedVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tickingRef = useRef(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const updatePinned = () => {
      const y = lastScrollYRef.current;
      setIsPinned((prevState) => {
        // Hysteresis: pin after 64px, unpin under 8px to avoid flicker
        if (prevState) {
          return y <= 8 ? false : true;
        }
        return y >= 64 ? true : false;
      });
    };

    const onScroll = () => {
      lastScrollYRef.current = window.scrollY || 0;
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(() => {
          updatePinned();
          tickingRef.current = false;
        });
      }
    };

    // Initialize state on mount
    lastScrollYRef.current = window.scrollY || 0;
    updatePinned();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isPinned) {
      // Defer to next frame to allow CSS transition from initial transform
      const id = requestAnimationFrame(() => setIsPinnedVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setIsPinnedVisible(false);
  }, [isPinned]);

  return (
    <header className={styles.header}>
      {/* Canvas Background */}
      <CanvasBackground />

      {/* Navigation Bar */}
      <div
        className={`${styles.navBar} ${isPinned ? styles.navBarPinned : ''} ${
          isPinned && isPinnedVisible ? styles.navBarPinnedVisible : ''
        }`}
      >
        <Container>
          <div className={styles.navBarContent}>
            {/* Logo */}
            <Image
              src={isPinned ? '/logo-light.png' : '/logo.png'}
              alt="fumirai logo"
              width={150}
              height={150}
              style={{ borderRadius: 0, width: 'auto', height: 'auto' }}
              priority
            />

            {/* Navigation (desktop only) */}
            <div className={styles.navDesktop}>
              <Navigation navBarPinnedVisible={isPinnedVisible} />
            </div>

            {/* CTA Section (desktop only) */}
            <div className={styles.ctaSection}>
              <LanguageDropdown />
              <Button className={styles.ctaButton} buttonType={ButtonType.Default}>
                Tuyển dụng
              </Button>
            </div>

            {/* Mobile menu button (md and below) */}
            <button
              aria-label="Open menu"
              className={styles.menuButton}
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon width={28} height={28} />
            </button>
          </div>
        </Container>
      </div>
      <MobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {isPinned && isPinnedVisible ? <div className={styles.navBarSpacer} /> : null}

      {/* Banner */}
      <Banner />
    </header>
  );
}
