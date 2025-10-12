'use client';

import Link from 'next/link';

import { Button } from '@/components/base';
import { ButtonType } from '@/components/base/Button';
import { ROUTERS } from '@/utils/constant';

import { Drawer } from 'antd';
import { useLocale, useTranslations } from 'next-intl';

import LanguageDropdown from '../LanguageDropdown';
import Navigation from '../Navigation';

import styles from './styles.module.scss';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations('homePage.cta');
  const locale = useLocale();

  return (
    <Drawer
      placement="right"
      open={open}
      onClose={onClose}
      width={300}
      rootClassName={styles.mobileDrawer}
      classNames={{
        header: styles.drawerHeader,
        body: styles.drawerBody,
        content: styles.drawerContent,
        mask: styles.drawerMask,
      }}
    >
      <div className={styles.menuBody}>
        <Navigation navBarPinnedVisible={true} direction="vertical" />
      </div>
      <div className={styles.menuFooter}>
        <Link href={ROUTERS.RECRUITMENT(locale)} onClick={onClose}>
          <Button className={styles.ctaButton} buttonType={ButtonType.Default}>
            {t('recruitment')}
          </Button>
        </Link>
        <LanguageDropdown isMobile />
      </div>
    </Drawer>
  );
}
