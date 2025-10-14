import React from 'react';

import { Button as AntButton, ButtonProps } from 'antd';

import styles from './styles.module.scss';

export enum ButtonVariant {
  Solid = 'solid',
  Outline = 'outline',
  Icon = 'icon',
}

export enum ButtonType {
  Default = 'default',
  Info = 'info',
}

export type ButtonPropsCustom = ButtonProps & {
  buttonType: ButtonType;
};

const Button: React.FC<ButtonPropsCustom> = ({ buttonType, ...props }) => {
  const className = `${props.className || ''} ${styles[buttonType] || ''}`.trim();
  return <AntButton {...props} className={className} />;
};

export default Button;
