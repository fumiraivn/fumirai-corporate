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

  return (
    <nav
      className={`${styles.navigation} ${!navBarPinnedVisible ? styles.navigationUnpinned : ''} ${
        direction === 'vertical' ? styles.navigationVertical : ''
      }`}
    >
      <ul className={styles.navList}>
        {[
          { key: 'home', href: '#' },
          { key: 'aboutUs', href: '#' },
          { key: 'services', href: '#' },
          { key: 'portfolio', href: '#' },
          { key: 'pages', href: '#' },
          { key: 'blog', href: '#' },
          { key: 'contact', href: '#' },
        ].map((item) => (
          <li className={styles.navItem} key={item.key}>
            <a href={item.href} className={styles.navLink}>
              {t(item.key)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
