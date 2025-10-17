import { Container } from '@/components/base';
import Logo from '@/components/base/Logo';
import Navigation from '@/components/user/layouts/Header/Navigation';
import { CommonContentLanguages, ContactItem, Copyright, ELanguage } from '@/types';

import styles from './styles.module.scss';

interface FooterProps {
  commonData?: CommonContentLanguages | null;
  locale?: ELanguage;
}

export default function Footer({ commonData, locale }: FooterProps) {
  // Helper function to get localized text
  const getLocalizedText = (item: ContactItem | Copyright | undefined, field: string): string => {
    if (!item || !locale) return '';
    const localeKey = locale.toLowerCase();
    const localizedField = `${field}_${localeKey}` as keyof typeof item;
    return (item[localizedField] as string) || (item[field as keyof typeof item] as string) || '';
  };

  return (
    <footer id="contact" className={styles.footer}>
      <Container isFullWidth className={styles.container}>
        <div className={styles.bottomInfo}>
          <div className={styles.logoWrap}>
            <Logo />
          </div>

          <div className={styles.contactRow}>
            {commonData?.phone && (
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>
                  {getLocalizedText(commonData.phone, 'title')}
                </span>
                <a href={`tel:${commonData.phone.description}`} className={styles.contactLink}>
                  {commonData.phone.description}
                </a>
              </div>
            )}
            {commonData?.email && (
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>
                  {getLocalizedText(commonData.email, 'title')}
                </span>
                <a
                  href={`mailto:${commonData.email.description.trim()}?subject=Inquiry`}
                  className={styles.contactLink}
                >
                  {commonData.email.description}
                </a>
              </div>
            )}
          </div>

          <div className={styles.copyright}>{getLocalizedText(commonData?.copyright, 'text')}</div>
        </div>

        <div className={styles.navBarBottom}>
          <Navigation menus={commonData?.menus} locale={locale} />
        </div>
      </Container>
    </footer>
  );
}
