import React from 'react';

import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

import styles from './styles.module.scss';

export enum ButtonVariant {
  Solid = 'solid',
  Outline = 'outline',
  Icon = 'icon',
}

export interface ButtonProps extends Omit<AntButtonProps, 'loading' | 'variant'> {
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
  /**
   * Visual variant for the button
   */
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  size = 'middle',
  type = 'primary',
  danger = false,
  ghost = false,
  block = false,
  disabled = false,
  className = '',
  onClick,
  children,
  variant = ButtonVariant.Solid,
  ...rest
}) => {
  const variantClassName = styles[variant] || '';
  const buttonClasses = [styles.button, variantClassName, className].filter(Boolean).join(' ');

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
export type { ButtonVariant as TButtonVariant };
