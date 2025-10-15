'use client';

import { Button, ButtonType, Container } from '@/components/base';
import { ArrowDownIcon } from '@/svgs/user/HomeIcon';
import { BannerContent, Button as ButtonTypeDef } from '@/types';
import { scrollToSection } from '@/utils/constant';

import styles from './styles.module.scss';

interface BannerProps {
  banner?: BannerContent;
  contactBtn?: ButtonTypeDef;
}

export default function Banner({ banner, contactBtn }: BannerProps) {
  const title = banner?.title;
  const description = banner?.description;
  const contactText = contactBtn?.text;
  const contactTarget = contactBtn?.redirect_to;

  return (
    <Container>
      <div className={styles.bannerContent}>
        <p className={styles.bannerTitle}>{title}</p>
        <p className={styles.bannerDescription}>{description}</p>
        <div className={styles.bannerButtons}>
          <Button
            buttonType={ButtonType.Info}
            onClick={() => {
              scrollToSection(contactTarget || 'contact');
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>{contactText}</span>
              <ArrowDownIcon className={styles.arrowBounce} width={18} height={18} />
            </span>
          </Button>
        </div>
      </div>
    </Container>
  );
}
