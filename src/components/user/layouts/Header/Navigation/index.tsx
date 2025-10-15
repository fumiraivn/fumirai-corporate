'use client';

import { usePathname, useRouter } from 'next/navigation';

import { MenuItem } from '@/types';
import { ROUTERS, scrollToSection } from '@/utils/constant';

import { useLocale } from 'next-intl';

import styles from './styles.module.scss';

interface NavigationProps {
  direction?: 'horizontal' | 'vertical';
  menus?: MenuItem[];
}

export default function Navigation({ direction = 'horizontal', menus = [] }: NavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

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
        {menus?.map((item) => (
          <li className={styles.navItem} key={item.key}>
            <a
              href={`#${item.value}`}
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, item.value!)}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
