'use client';

import { Button } from '@/components/base';
import { ButtonType } from '@/components/base/Button';

import { Drawer } from 'antd';
import { useTranslations } from 'next-intl';

import LanguageDropdown from '../LanguageDropdown';
import Navigation from '../Navigation';

import styles from './styles.module.scss';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const t = useTranslations('homePage.cta');
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
        <Button className={styles.ctaButton} buttonType={ButtonType.Default} onClick={onClose}>
          {t('recruitment')}
        </Button>
        <LanguageDropdown isMobile />
      </div>
    </Drawer>
  );
}
