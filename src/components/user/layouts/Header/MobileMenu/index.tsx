'use client';

import { useRouter } from 'next/navigation';

import { Button, ButtonType } from '@/components/base';
import { ROUTERS } from '@/utils/constant';

import { Drawer } from 'antd';
import { useLocale } from 'next-intl';

import LanguageDropdown from '../LanguageDropdown';
import Navigation from '../Navigation';

import styles from './styles.module.scss';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const router = useRouter();
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
        <Navigation direction="vertical" />
      </div>
      <div className={styles.menuFooter}>
        <Button
          buttonType={ButtonType.Default}
          onClick={() => router.push(ROUTERS.RECRUITMENT(locale))}
        >
          Tuyển dụng
        </Button>
        <LanguageDropdown isMobile />
      </div>
    </Drawer>
  );
}
