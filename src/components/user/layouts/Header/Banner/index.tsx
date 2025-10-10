'use client';

import Image from 'next/image';

import { Container } from '@/components/base';

import styles from './styles.module.scss';

export default function Banner() {
  return (
    <Container>
      <div className={styles.bannerContent}>
        <div className={styles.bannerContentLeft}>
          <p className={styles.bannerTitle}>
            Công ty công nghệ giải pháp phần mềm cho thị trường Nhật Bản & toàn cầu.
          </p>
          <p className={styles.bannerDescription}>
            Công ty vốn đầu tư 100% từ Nhật với công ty mẹ là fulfillments . Với đội ngũ nhân sự trẻ
            có nhiều kinh nghiệm trong lĩnh vực thiết kế phần mềm.
          </p>
        </div>
        <div className={styles.bannerImage}>
          <Image src="/banner.png" alt="hero illustration" width={1000} height={1000} />
        </div>
      </div>
    </Container>
  );
}
