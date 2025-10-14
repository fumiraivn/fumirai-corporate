'use client';

import { Button, ButtonType, Container } from '@/components/base';
import { ArrowDownIcon } from '@/svgs/user/HomeIcon';

import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';

export default function Banner() {
  const t = useTranslations('homePage.banner');

  return (
    <Container>
      <div className={styles.bannerContent}>
        <p className={styles.bannerTitle}>{t('title')}</p>
        <p className={styles.bannerDescription}>{t('description')}</p>
        <div className={styles.bannerButtons}>
          <Button
            buttonType={ButtonType.Info}
            onClick={() => {
              const footer = document.querySelector('footer');
              if (footer) {
                footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>Liên hệ</span>
              <ArrowDownIcon className={styles.arrowBounce} width={18} height={18} />
            </span>
          </Button>
        </div>
      </div>
    </Container>
  );
}
