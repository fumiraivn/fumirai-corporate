'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, ButtonType, Container, Logo } from '@/components/base';
import { MenuIcon } from '@/svgs/user/HomeIcon';
import { ROUTERS } from '@/utils/constant';

import { useLocale } from 'next-intl';

import Banner from './Banner';
import LanguageDropdown from './LanguageDropdown';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';
import styles from './styles.module.scss';

interface HeaderProps {
  usePinnedHeader?: boolean;
}

export default function Header({ usePinnedHeader = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(usePinnedHeader);
  const [isPinnedVisible, setIsPinnedVisible] = useState(usePinnedHeader);
  const [navHeight, setNavHeight] = useState(0);
  const navBarRef = useRef<HTMLDivElement | null>(null);
  const lastScrollYRef = useRef(0);
  const locale = useLocale();
  const router = useRouter();

  // Update pinned state when usePinnedHeader changes
  useEffect(() => {
    setIsPinned(usePinnedHeader);
    setIsPinnedVisible(usePinnedHeader);
  }, [usePinnedHeader]);

  useEffect(() => {
    // If usePinnedHeader is true, don't add scroll listener
    if (usePinnedHeader) {
      return;
    }

    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;

      // Pin when we have scrolled past a threshold
      const shouldPin = currentY > 80;
      setIsPinned(shouldPin);

      // Show the pinned bar when scrolling down or when near top unpin
      // We want the bar to slide in when pinned and user scrolls down, and remain when scrolling up
      if (shouldPin) {
        setIsPinnedVisible(true);
      } else {
        setIsPinnedVisible(false);
      }

      lastScrollYRef.current = currentY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [usePinnedHeader]);

  useEffect(() => {
    const measure = () => {
      if (navBarRef.current) {
        setNavHeight(navBarRef.current.offsetHeight || 0);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <header
      className={styles.header}
      style={{ paddingTop: usePinnedHeader ? 0 : isPinned ? navHeight : 0 }}
    >
      {/* Navigation Bar */}
      <div
        ref={navBarRef}
        className={`${styles.navBar} ${isPinned || usePinnedHeader ? styles.navBarPinned : ''} ${
          (isPinned && isPinnedVisible) || usePinnedHeader ? styles.navBarPinnedVisible : ''
        }`}
      >
        <Container>
          <div className={styles.navBarContent}>
            {/* Logo */}
            <Logo href={ROUTERS.HOME(locale)} className={styles.logo} />

            {/* Navigation (desktop only) */}
            <div className={styles.navDesktop}>
              <Navigation />
            </div>

            {/* CTA Section (desktop only) */}
            <div className={styles.ctaSection}>
              <LanguageDropdown />
              <Button
                onClick={() => router.push(ROUTERS.RECRUITMENT(locale))}
                buttonType={ButtonType.Default}
              >
                Tuyển dụng
              </Button>
            </div>

            {/* Mobile menu button (md and below) */}
            <div
              aria-label="Open menu"
              className={styles.menuButton}
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon width={28} height={28} />
            </div>
          </div>
        </Container>
      </div>
      <MobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      {!usePinnedHeader && <Banner />}
    </header>
  );
}
