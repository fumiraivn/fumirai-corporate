'use client';

import { Drawer } from 'antd';

import LanguageDropdown from '../LanguageDropdown';
import Navigation from '../Navigation';

import styles from './styles.module.scss';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
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
        <LanguageDropdown isMobile />
      </div>
    </Drawer>
  );
}
