'use client';

import { useState } from 'react';

import { Container, Logo } from '@/components/base';
import { MenuIcon } from '@/svgs/user/HomeIcon';
import { ROUTERS } from '@/utils/constant';

import { useLocale } from 'next-intl';

import Banner from './Banner';
import LanguageDropdown from './LanguageDropdown';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';
import styles from './styles.module.scss';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locale = useLocale();

  return (
    <header className={styles.header}>
      {/* Navigation Bar */}
      <div className={`${styles.navBar} ${styles.navBarPinned} ${styles.navBarPinnedVisible}`}>
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

      <Banner />
    </header>
  );
}
