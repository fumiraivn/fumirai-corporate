import Image from 'next/image';

import { Container } from '@/components/base';
import { FacebookIcon, LinkedInIcon, YouTubeIcon } from '@/svgs/user/HomeIcon';

import styles from './styles.module.scss';

export default function Footer() {
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
                width={180}
                height={120}
                className={styles.logo}
              />
            </div>

            {/* Contact Information */}
            <div className={styles.contactSection}>
              <div className={styles.contactRow}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Phone:</span>
                  <a href="tel:+84385135531" className={styles.contactLink}>
                    (+84) 385 135 531
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>Email:</span>
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
            © 2025 FUMIRAI COMPANY LIMITED All Rights Reserved.
          </Container>
        </Container>
      </div>
    </footer>
  );
}
