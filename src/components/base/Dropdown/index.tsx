import React from 'react';

import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';

import styles from './styles.module.scss';

export interface DropdownOption {
  /**
   * Value of the option
   */
  value: string | number;
  /**
   * Label of the option
   */
  label: string;
  /**
   * Whether the option is disabled
   */
  disabled?: boolean;
}

export interface DropdownProps extends Omit<AntSelectProps, 'options'> {
  /**
   * Array of options for the dropdown
   */
  options?: DropdownOption[];
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean;
  /**
   * Whether the dropdown allows multiple selection
   */
  multiple?: boolean;
  /**
   * Size of the dropdown
   */
  size?: 'small' | 'middle' | 'large';
  /**
   * Custom className
   */
  className?: string;
  /**
   * Current value
   */
  value?: string | number | (string | number)[];
  /**
   * Default value
   */
  defaultValue?: string | number | (string | number)[];
  /**
   * Whether the dropdown is loading
   */
  loading?: boolean;
  /**
   * Whether the dropdown allows clearing
   */
  allowClear?: boolean;
  /**
   * Whether the dropdown is searchable
   */
  showSearch?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  placeholder = 'Please select',
  disabled = false,
  multiple = false,
  size = 'middle',
  className = '',
  value,
  defaultValue,
  loading = false,
  allowClear = true,
  showSearch = false,
  ...rest
}) => {
  const dropdownClasses = [styles.dropdown, className].filter(Boolean).join(' ');

  const defaultFilterOption = (input: string, option?: DropdownOption) => {
    return option ? option.label.toLowerCase().includes(input.toLowerCase()) : false;
  };

  return (
    <AntSelect
      className={dropdownClasses}
      options={options}
      placeholder={placeholder}
      disabled={disabled}
      mode={multiple ? 'multiple' : undefined}
      size={size}
      value={value}
      defaultValue={defaultValue}
      loading={loading}
      allowClear={allowClear}
      showSearch={showSearch}
      filterOption={defaultFilterOption}
      {...rest}
    />
  );
};

export default Dropdown;
