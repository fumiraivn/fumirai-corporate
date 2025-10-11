import Image from 'next/image';

import { Container } from '@/components/base';
import { FacebookIcon, LinkedInIcon, YouTubeIcon } from '@/svgs/user/HomeIcon';

import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';

export default function Footer() {
  const t = useTranslations('homePage.footer');
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      {/* Top Section */}
      <div className={styles.topSection}>
        <Container isFullWidth className={styles.container}>
          <Container className={styles.content}>
            {/* Logo */}
            <div className={styles.logoSection}>
              <Image
                src="/logo-light.png"
                alt="FUMIRAI Company Logo"
                width={200}
                height={100}
                className={styles.logo}
              />
            </div>

            {/* Contact Information */}
            <div className={styles.contactSection}>
              <div className={styles.contactRow}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>{t('contact.phone')}</span>
                  <a href="tel:+84385135531" className={styles.contactLink}>
                    (+84) 385 135 531
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>{t('contact.email')}</span>
                  <a href="mailto:fumirai@ltd.com" className={styles.contactLink}>
                    fumirai@ltd.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className={styles.socialSection}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <FacebookIcon width={24} height={24} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="YouTube"
              >
                <YouTubeIcon width={24} height={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <LinkedInIcon width={24} height={24} />
              </a>
            </div>
          </Container>
        </Container>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomSection}>
        <Container isFullWidth className={styles.copyrightContainer}>
          <Container className={styles.copyright}>
            © {currentYear} {t('copyright')}
          </Container>
        </Container>
      </div>
    </footer>
  );
}
