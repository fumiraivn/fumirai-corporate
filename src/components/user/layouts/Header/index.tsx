'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button, Container } from '@/components/base';
import { ButtonType } from '@/components/base/Button';
import { MenuIcon } from '@/svgs/user/HomeIcon';
import { ROUTERS } from '@/ultils/constant';

import { useLocale, useTranslations } from 'next-intl';

import Banner from './Banner';
import CanvasBackground from './CanvasBackground';
import LanguageDropdown from './LanguageDropdown';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';
import styles from './styles.module.scss';

interface HeaderProps {
  pinnedOnly?: boolean; // New prop to control pinned-only mode
}

export default function Header({ pinnedOnly = false }: HeaderProps) {
  const [isPinned, setIsPinned] = useState(pinnedOnly); // Start pinned if pinnedOnly
  const [isPinnedVisible, setIsPinnedVisible] = useState(pinnedOnly); // Start visible if pinnedOnly
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tickingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const t = useTranslations('homePage.cta');
  const locale = useLocale();

  useEffect(() => {
    // Skip scroll logic if in pinnedOnly mode
    if (pinnedOnly) return;

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
  }, [pinnedOnly]);

  useEffect(() => {
    if (isPinned) {
      // Defer to next frame to allow CSS transition from initial transform
      const id = requestAnimationFrame(() => setIsPinnedVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setIsPinnedVisible(false);
  }, [isPinned]);

  return (
    <header className={`${styles.header} ${pinnedOnly ? styles.headerPinnedOnly : ''}`}>
      {/* Canvas Background - only show if not pinnedOnly */}
      {!pinnedOnly && <CanvasBackground />}

      {/* Navigation Bar */}
      <div
        className={`${styles.navBar} ${pinnedOnly || isPinned ? styles.navBarPinned : ''} ${
          pinnedOnly || (isPinned && isPinnedVisible) ? styles.navBarPinnedVisible : ''
        }`}
      >
        <Container>
          <div className={styles.navBarContent}>
            {/* Logo */}
            <Link href={ROUTERS.HOME(locale)}>
              <Image
                src={pinnedOnly || isPinned ? '/logo-light.png' : '/logo.png'}
                alt="fumirai logo"
                width={150}
                height={150}
                style={{ borderRadius: 0, width: 'auto', height: 'auto' }}
                priority
              />
            </Link>

            {/* Navigation (desktop only) */}
            <div className={styles.navDesktop}>
              <Navigation navBarPinnedVisible={pinnedOnly || isPinnedVisible} />
            </div>

            {/* CTA Section (desktop only) */}
            <div className={styles.ctaSection}>
              <LanguageDropdown />
              <Link href={ROUTERS.RECRUITMENT(locale)}>
                <Button className={styles.ctaButton} buttonType={ButtonType.Default}>
                  {t('recruitment')}
                </Button>
              </Link>
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
      {pinnedOnly || (isPinned && isPinnedVisible) ? <div className={styles.navBarSpacer} /> : null}

      {/* Banner - only show if not pinnedOnly */}
      {!pinnedOnly && <Banner />}
    </header>
  );
}
