'use client';

import { Button, ButtonType, Container } from '@/components/base';
import { ArrowDownIcon } from '@/svgs/user/HomeIcon';
import { ELanguage } from '@/types';
import { scrollToSection } from '@/utils/constant';

import styles from './styles.module.scss';

interface BannerProps {
  title?: string;
  description?: string;
  locale?: ELanguage;
}

export default function Banner({ title, description }: BannerProps) {
  return (
    <Container>
      <div className={styles.bannerContent}>
        <p className={styles.bannerTitle}>{title}</p>
        <p className={styles.bannerDescription}>{description}</p>
        <div className={styles.bannerButtons}>
          <Button
            buttonType={ButtonType.Info}
            onClick={() => {
              scrollToSection('contact');
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>Contact</span>
              <ArrowDownIcon className={styles.arrowBounce} width={18} height={18} />
            </span>
          </Button>
        </div>
      </div>
    </Container>
  );
}
