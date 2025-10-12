import { usePathname, useRouter } from 'next/navigation';

import { ROUTERS, scrollToSection } from '@/ultils/constant';

import { useLocale, useTranslations } from 'next-intl';

import styles from './styles.module.scss';

interface NavigationProps {
  navBarPinnedVisible?: boolean;
  direction?: 'horizontal' | 'vertical';
}

export default function Navigation({
  navBarPinnedVisible = false,
  direction = 'horizontal',
}: NavigationProps) {
  const t = useTranslations('homePage.navigation');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const navigationItems = [
    { key: 'home', sectionId: 'home' },
    { key: 'ourServices', sectionId: 'our-services' },
    { key: 'aboutUs', sectionId: 'about-us' },
    { key: 'customers', sectionId: 'customers' },
    { key: 'teamMembers', sectionId: 'team-members' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    // Check if we're on home page
    const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === '/';

    if (!isHomePage) {
      // If not on home page, navigate to home first, then scroll to section
      router.push(ROUTERS.HOME(locale));
      // Use setTimeout to ensure navigation completes before scrolling
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      // If already on home page, just scroll to section
      scrollToSection(sectionId);
    }
  };

  return (
    <nav
      className={`${styles.navigation} ${!navBarPinnedVisible ? styles.navigationUnpinned : ''} ${
        direction === 'vertical' ? styles.navigationVertical : ''
      }`}
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
