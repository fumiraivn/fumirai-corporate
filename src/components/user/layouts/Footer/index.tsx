import { Container } from '@/components/base';
import Logo from '@/components/base/Logo';
import Navigation from '@/components/user/layouts/Header/Navigation';

import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';

export default function Footer() {
  const t = useTranslations('homePage.footer');
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <Container isFullWidth className={styles.container}>
        <div className={styles.bottomInfo}>
          <div className={styles.logoWrap}>
            <Logo imgSrc="/logo-light.png" text="" width={140} height={60} />
          </div>

          <div className={styles.contactRow}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t('contact.phone')}</span>
              <a href="tel:+84385135531" className={styles.contactLink}>
                (+84) 385 135 531
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t('contact.email')}</span>
              <a href="mailto:fumirai@ltd.com?subject=Inquiry" className={styles.contactLink}>
                fumirai@ltd.com
              </a>
            </div>
          </div>

          <div className={styles.copyright}>{`© ${currentYear} ${t('copyright')}`}</div>
        </div>

        <div className={styles.navBarBottom}>
          <Navigation />
        </div>
      </Container>
    </footer>
  );
}
