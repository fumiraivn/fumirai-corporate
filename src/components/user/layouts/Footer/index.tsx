import { Container } from '@/components/base';
import Logo from '@/components/base/Logo';
import Navigation from '@/components/user/layouts/Header/Navigation';
import { CommonContent } from '@/types';

import styles from './styles.module.scss';

interface FooterProps {
  commonData?: CommonContent | null;
}

export default function Footer({ commonData }: FooterProps) {
  return (
    <footer id="contact" className={styles.footer}>
      <Container isFullWidth className={styles.container}>
        <div className={styles.bottomInfo}>
          <div className={styles.logoWrap}>
            <Logo />
          </div>

          <div className={styles.contactRow}>
            {commonData?.contact?.map((contact, index) => (
              <div key={index} className={styles.contactItem}>
                <span className={styles.contactLabel}>{contact.text}</span>
                <a
                  href={
                    contact.value.includes('@')
                      ? `mailto:${contact.value.trim()}?subject=Inquiry`
                      : `tel:${contact.value}`
                  }
                  className={styles.contactLink}
                >
                  {contact.value}
                </a>
              </div>
            ))}
          </div>

          <div className={styles.copyright}>{commonData?.copyright}</div>
        </div>

        <div className={styles.navBarBottom}>
          <Navigation menus={commonData?.menus} />
        </div>
      </Container>
    </footer>
  );
}
