'use client';

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, ButtonType, Container, Logo } from '@/components/base';
import { getLocalizedTextFromArray, useClientLocaleSwitcher } from '@/hooks';
import { MenuIcon } from '@/svgs/user/HomeIcon';
import { BlockContent, Button as ButtonTypeDef, CommonContentLanguages, ELanguage } from '@/types';
import { ROUTERS } from '@/utils/constant';

import { useLocale } from 'next-intl';

import Banner from './Banner';
import LanguageDropdown from './LanguageDropdown';
import MobileMenu from './MobileMenu';
import Navigation from './Navigation';
import styles from './styles.module.scss';

interface HeaderProps {
  usePinnedHeader?: boolean;
  commonData?: CommonContentLanguages | null;
  locale?: ELanguage;
  bannerData?: BlockContent | null;
}

export default function Header({
  usePinnedHeader = false,
  commonData,
  locale,
  bannerData,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(usePinnedHeader);
  const [isPinnedVisible, setIsPinnedVisible] = useState(usePinnedHeader);
  const [navHeight, setNavHeight] = useState(0);
  const navBarRef = useRef<HTMLDivElement | null>(null);
  const lastScrollYRef = useRef(0);
  const { currentLocale: clientLocale } = useClientLocaleSwitcher();
  const currentLocale = useLocale();
  const router = useRouter();

  // Use client locale if available, otherwise fallback to provided locale
  const activeLocale = clientLocale || locale || (currentLocale as ELanguage);

  // Helper function to get localized text
  const getLocalizedText = (item: ButtonTypeDef | undefined, field: string): string => {
    if (!item) return '';
    const localeKey = activeLocale.toLowerCase();
    const localizedField = `${field}_${localeKey}` as keyof ButtonTypeDef;
    return (item[localizedField] as string) || (item[field as keyof ButtonTypeDef] as string) || '';
  };

  // Get current language dropdown data
  const getCurrentLanguageDropdown = () => {
    if (!commonData?.language_dropdown) return null;
    return commonData.language_dropdown.find((dropdown) =>
      dropdown.current_language.includes(activeLocale),
    );
  };

  const currentLanguageDropdown = getCurrentLanguageDropdown();

  // Get banner title and description using helper function
  const bannerTitle = bannerData
    ? getLocalizedTextFromArray(bannerData.title || [], activeLocale)
    : '';
  const bannerDescription = bannerData
    ? getLocalizedTextFromArray(bannerData.description || [], activeLocale)
    : '';

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
            <Logo
              alt={commonData?.logo?.alt}
              imgSrc={commonData?.logo?.url}
              href={ROUTERS.HOME(activeLocale)}
              className={styles.logo}
            />

            {/* Navigation (desktop only) */}
            <div className={styles.navDesktop}>
              <Navigation menus={commonData?.menus} locale={activeLocale} />
            </div>

            {/* CTA Section (desktop only) */}
            <div className={styles.ctaSection}>
              <LanguageDropdown languageDropdown={currentLanguageDropdown} locale={activeLocale} />
              <Button
                onClick={() => router.push(ROUTERS.RECRUITMENT(activeLocale))}
                buttonType={ButtonType.Default}
              >
                {getLocalizedText(commonData?.recruitment_button, 'text') || 'Tuyển dụng'}
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
      <MobileMenu
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        commonData={commonData}
        locale={activeLocale}
      />
      {!usePinnedHeader && (
        <Banner title={bannerTitle} description={bannerDescription} locale={activeLocale} />
      )}
    </header>
  );
}
