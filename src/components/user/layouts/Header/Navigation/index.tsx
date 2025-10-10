import styles from './styles.module.scss';

interface NavigationProps {
  navBarPinnedVisible?: boolean;
}

export default function Navigation({ navBarPinnedVisible = false }: NavigationProps) {
  return (
    <nav
      className={`${styles.navigation} ${!navBarPinnedVisible ? styles.navigationUnpinned : ''}`}
    >
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Home
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            About Us
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Services
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Portfolio
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Pages
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Blog
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#" className={styles.navLink}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
