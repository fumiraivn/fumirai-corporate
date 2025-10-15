'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ROUTERS, scrollToSection } from '@/utils/constant';

import { useLocale, useTranslations } from 'next-intl';

import styles from './styles.module.scss';

interface NavigationProps {
  direction?: 'horizontal' | 'vertical';
}

export default function Navigation({ direction = 'horizontal' }: NavigationProps) {
  const t = useTranslations('homePage.navigation');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const navigationItems = [
    { key: 'home', sectionId: 'home' },
    { key: 'aboutUs', sectionId: 'about-us' },
    { key: 'ourServices', sectionId: 'our-services' },
    { key: 'contact', sectionId: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    // Check if we're on home page
    const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === '/';

    if (!isHomePage) {
      // If not on home page, navigate to home with hash
      router.push(`${ROUTERS.HOME(locale)}#${sectionId}`);
    } else {
      // If already on home page, update URL and scroll to section
      const newUrl = `${ROUTERS.HOME(locale)}#${sectionId}`;
      window.history.pushState(null, '', newUrl);
      scrollToSection(sectionId);
    }
  };

  return (
    <nav
      className={`${styles.navigation} ${direction === 'vertical' ? styles.navigationVertical : ''}`}
    >
      <ul className={styles.navList}>
        {navigationItems.map((item) => (
          <li className={styles.navItem} key={item.key}>
            <a
              href={`#${item.sectionId}`}
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, item.sectionId!)}
            >
              {t(item.key)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
