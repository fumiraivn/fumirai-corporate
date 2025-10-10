import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';

interface NavigationProps {
  navBarPinnedVisible?: boolean;
}

export default function Navigation({ navBarPinnedVisible = false }: NavigationProps) {
  const t = useTranslations('homePage.navigation');

  return (
    <nav
      className={`${styles.navigation} ${!navBarPinnedVisible ? styles.navigationUnpinned : ''}`}
    >
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            {t('home')}
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            {t('aboutUs')}
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            {t('services')}
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            {t('portfolio')}
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            {t('pages')}
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            {t('blog')}
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            {t('contact')}
          </a>
        </li>
      </ul>
    </nav>
  );
}
