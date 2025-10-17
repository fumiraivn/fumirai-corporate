'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ELanguage, MenuItem } from '@/types';
import { ROUTERS, scrollToSection } from '@/utils/constant';

import { useLocale } from 'next-intl';

import styles from './styles.module.scss';

interface NavigationProps {
  direction?: 'horizontal' | 'vertical';
  menus?: MenuItem[];
  locale?: ELanguage;
}

export default function Navigation({
  direction = 'horizontal',
  menus = [],
  locale,
}: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const activeLocale = locale || (currentLocale as ELanguage);

  // Helper function to get localized text
  const getLocalizedText = (item: MenuItem) => {
    if (!item) return '';
    const localeKey = activeLocale.toLowerCase();
    return (item[localeKey as keyof MenuItem] as string) || '';
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    // Check if we're on home page
    const isHomePage =
      pathname === `/${activeLocale}` || pathname === `/${activeLocale}/` || pathname === '/';

    if (!isHomePage) {
      // If not on home page, navigate to home with hash
      router.push(`${ROUTERS.HOME(activeLocale)}#${sectionId}`);
    } else {
      // If already on home page, update URL and scroll to section
      const newUrl = `${ROUTERS.HOME(activeLocale)}#${sectionId}`;
      window.history.pushState(null, '', newUrl);
      scrollToSection(sectionId);
    }
  };

  return (
    <nav
      className={`${styles.navigation} ${direction === 'vertical' ? styles.navigationVertical : ''}`}
    >
      <ul className={styles.navList}>
        {menus?.map((item) => (
          <li className={styles.navItem} key={item.url}>
            <a
              href={`#${item.url}`}
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, item.url!)}
            >
              {getLocalizedText(item)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
