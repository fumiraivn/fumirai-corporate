import React, { useState } from 'react';

import { useLocaleSwitcher } from '@/hooks';
import { EnglishFlagIcon, JapaneseFlagIcon, VietnameseFlagIcon } from '@/svgs/user/HomeIcon';
import { ELanguage } from '@/types';

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
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ className = '' }) => {
  const { currentLocale, switchLocale } = useLocaleSwitcher();
  const [selectedValue, setSelectedValue] = useState(currentLocale);

  const handleChange = (newValue: string) => {
    setSelectedValue(newValue);
    switchLocale(newValue);
  };

  const dropdownClasses = [styles.languageDropdown, className].filter(Boolean).join(' ');

  const selectedOption = languageOptions.find((option) => option.value === selectedValue);

  // Custom trigger component - chỉ hiển thị icon
  const triggerComponent = <div className={styles.trigger}>{selectedOption?.flag}</div>;

  // Menu items
  const menuItems = languageOptions.map((option) => ({
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
