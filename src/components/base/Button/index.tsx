import React from 'react';

import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

import styles from './styles.module.scss';

export interface ButtonProps extends Omit<AntButtonProps, 'loading'> {
  /**
   * Loading state of the button
   */
  loading?: boolean;
  /**
   * Size of the button
   */
  size?: 'small' | 'middle' | 'large';
  /**
   * Type of the button
   */
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  /**
   * Danger button
   */
  danger?: boolean;
  /**
   * Ghost button
   */
  ghost?: boolean;
  /**
   * Block button
   */
  block?: boolean;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Button content
   */
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  size = 'middle',
  type = 'default',
  danger = false,
  ghost = false,
  block = false,
  disabled = false,
  className = '',
  onClick,
  children,
  ...rest
}) => {
  const buttonClasses = [styles.button, className].filter(Boolean).join(' ');

  return (
    <AntButton
      className={buttonClasses}
      loading={loading}
      size={size}
      type={type}
      danger={danger}
      ghost={ghost}
      block={block}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </AntButton>
  );
};

export default Button;
