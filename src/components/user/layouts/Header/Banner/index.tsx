'use client';

import { Button, ButtonType, Container } from '@/components/base';

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
          <Button buttonType={ButtonType.Default}>Tuyển dụng</Button>
          <Button buttonType={ButtonType.Info}>Liên hệ</Button>
        </div>
      </div>
    </Container>
  );
}
