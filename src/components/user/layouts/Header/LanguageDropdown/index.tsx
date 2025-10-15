import React, { useState } from 'react';

import { useLocaleSwitcher } from '@/hooks';
import { EnglishFlagIcon, JapaneseFlagIcon, VietnameseFlagIcon } from '@/svgs/user/HomeIcon';
import { ELanguage, MenuItem } from '@/types';

import { Dropdown } from 'antd';

import styles from './styles.module.scss';

export interface LanguageOption {
  value: ELanguage;
  label: string;
  flag: React.ReactNode;
}

const languageOptions: LanguageOption[] = [
  {
    value: ELanguage.EN,
    label: 'English',
    flag: <EnglishFlagIcon width={24} height={24} />,
  },
  {
    value: ELanguage.JA,
    label: '日本語',
    flag: <JapaneseFlagIcon width={24} height={24} />,
  },
  {
    value: ELanguage.VI,
    label: 'Tiếng Việt',
    flag: <VietnameseFlagIcon width={24} height={24} />,
  },
];

interface LanguageDropdownProps {
  className?: string;
  isMobile?: boolean;
  languages?: MenuItem[];
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  className = '',
  isMobile = false,
  languages,
}) => {
  const { currentLocale, switchLocale } = useLocaleSwitcher();
  const [selectedValue, setSelectedValue] = useState(currentLocale);

  const handleChange = (newValue: string) => {
    setSelectedValue(newValue);
    switchLocale(newValue);
  };

  const dropdownClasses = [styles.languageDropdown, className].filter(Boolean).join(' ');

  // Use languages from API or fallback to hardcoded options
  const availableLanguages =
    languages?.map((lang) => {
      const flagMap = {
        en: <EnglishFlagIcon width={24} height={24} />,
        ja: <JapaneseFlagIcon width={24} height={24} />,
        vi: <VietnameseFlagIcon width={24} height={24} />,
      };
      return {
        value: lang.value as ELanguage,
        label: lang.text,
        flag: flagMap[lang.value as keyof typeof flagMap] || (
          <EnglishFlagIcon width={24} height={24} />
        ),
      };
    }) || languageOptions;

  const selectedOption = availableLanguages.find((option) => option.value === selectedValue);

  // Trigger component
  const triggerComponent = isMobile ? (
    <div className={styles.mobileTrigger}>
      <span className={styles.mobileTriggerIcon}>{selectedOption?.flag}</span>
      <span className={styles.mobileTriggerText}>{selectedOption?.label}</span>
    </div>
  ) : (
    <div className={styles.trigger}>{selectedOption?.flag}</div>
  );

  // Menu items
  const menuItems = availableLanguages.map((option) => ({
    key: option.value,
    label: (
      <div className={styles.optionContent}>
        <div className={styles.optionIcon}>{option.flag}</div>
        <span className={styles.optionLabel}>{option.label}</span>
      </div>
    ),
  }));

  return (
    <Dropdown
      className={dropdownClasses}
      menu={{ items: menuItems, onClick: ({ key }) => handleChange(key) }}
      trigger={['click']}
      placement="bottomRight"
    >
      {triggerComponent}
    </Dropdown>
  );
};

export default LanguageDropdown;
