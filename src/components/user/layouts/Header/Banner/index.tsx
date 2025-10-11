'use client';

import Image from 'next/image';

import { Container } from '@/components/base';

import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';

export default function Banner() {
  const t = useTranslations('homePage.banner');

  return (
    <Container>
      <div className={styles.bannerContent}>
        <div className={styles.bannerContentLeft}>
          <p className={styles.bannerTitle}>{t('title')}</p>
          <p className={styles.bannerDescription}>{t('description')}</p>
        </div>
        <div className={styles.bannerImage}>
          <Image src="/banner.png" alt="hero illustration" width={1000} height={1000} />
        </div>
      </div>
    </Container>
  );
}
