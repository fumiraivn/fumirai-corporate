'use client';

import { useRouter } from 'next/navigation';

import { Button, ButtonType } from '@/components/base';
import { Button as ButtonTypeDef, CommonContentLanguages, ELanguage } from '@/types';
import { ROUTERS } from '@/utils/constant';

import { Drawer } from 'antd';
import { useLocale } from 'next-intl';

import LanguageDropdown from '../LanguageDropdown';
import Navigation from '../Navigation';

import styles from './styles.module.scss';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  commonData?: CommonContentLanguages | null;
  locale?: ELanguage;
}

export default function MobileMenu({ open, onClose, commonData, locale }: MobileMenuProps) {
  const router = useRouter();
  const currentLocale = useLocale();
  const activeLocale = locale || (currentLocale as ELanguage);

  // Helper function to get localized text
  const getLocalizedText = (item: ButtonTypeDef | undefined, field: string): string => {
    if (!item) return '';
    const localeKey = activeLocale.toLowerCase();
    const localizedField = `${field}_${localeKey}` as keyof ButtonTypeDef;
    return (item[localizedField] as string) || (item[field as keyof ButtonTypeDef] as string) || '';
  };

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
        <Navigation direction="vertical" menus={commonData?.menus} locale={activeLocale} />
      </div>
      <div className={styles.menuFooter}>
        <Button
          buttonType={ButtonType.Default}
          onClick={() => router.push(ROUTERS.RECRUITMENT(activeLocale))}
        >
          {getLocalizedText(commonData?.recruitment_button, 'text') || 'Tuyển dụng'}
        </Button>
        <LanguageDropdown
          isMobile
          languageDropdown={commonData?.language_dropdown?.find((dropdown) =>
            dropdown.current_language.includes(activeLocale),
          )}
          locale={activeLocale}
        />
      </div>
    </Drawer>
  );
}
