import React, { useEffect, useState } from 'react';

import { useClientLocaleSwitcher } from '@/hooks';
import { EnglishFlagIcon, JapaneseFlagIcon, VietnameseFlagIcon } from '@/svgs/user/HomeIcon';
import { ELanguage, LanguageDropdown as LanguageDropdownType } from '@/types';

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
  languageDropdown?: LanguageDropdownType | null;
  locale?: ELanguage;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  className = '',
  isMobile = false,
  languageDropdown,
}) => {
  const { currentLocale, switchLocale } = useClientLocaleSwitcher();
  const [selectedValue, setSelectedValue] = useState(currentLocale);

  // Keep selected value in sync with current client locale
  useEffect(() => {
    if (currentLocale !== selectedValue) {
      setSelectedValue(currentLocale as ELanguage);
    }
  }, [currentLocale, selectedValue]);

  const handleChange = (newValue: string) => {
    setSelectedValue(newValue as ELanguage);
    switchLocale(newValue);
  };

  const dropdownClasses = [styles.languageDropdown, className].filter(Boolean).join(' ');

  // Use language dropdown from API or fallback to hardcoded options
  const availableLanguages = (() => {
    if (!languageDropdown?.options?.[0]) {
      return languageOptions;
    }

    const option = languageDropdown.options[0];
    const flagMap = {
      en: <EnglishFlagIcon width={24} height={24} />,
      ja: <JapaneseFlagIcon width={24} height={24} />,
      vi: <VietnameseFlagIcon width={24} height={24} />,
    };

    return [
      {
        value: ELanguage.EN,
        label: option.en?.[0]?.text,
        flag: flagMap.en,
      },
      {
        value: ELanguage.JA,
        label: option.ja?.[0]?.text,
        flag: flagMap.ja,
      },
      {
        value: ELanguage.VI,
        label: option.vi?.[0]?.text,
        flag: flagMap.vi,
      },
    ];
  })();

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
