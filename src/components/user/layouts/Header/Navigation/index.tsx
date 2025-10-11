import { scrollToSection } from '@/ultils/constant';

import { useTranslations } from 'next-intl';

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

  const navigationItems = [
    { key: 'home', sectionId: 'home' },
    { key: 'ourServices', sectionId: 'our-services' },
    { key: 'aboutUs', sectionId: 'about-us' },
    { key: 'customers', sectionId: 'customers' },
    { key: 'teamMembers', sectionId: 'team-members' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
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
              onClick={(e) => handleNavClick(e, item.sectionId)}
            >
              {t(item.key)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
