import React from 'react';

interface IconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const EnglishFlagIcon: React.FC<IconProps> = ({
  className = '',
  width = 24,
  height = 24,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="2" fill="#B22234" />
    <rect y="0" width="24" height="1.85" fill="#fff" />
    <rect y="3.7" width="24" height="1.85" fill="#fff" />
    <rect y="7.4" width="24" height="1.85" fill="#fff" />
    <rect y="11.1" width="24" height="1.85" fill="#fff" />
    <rect y="14.8" width="24" height="1.85" fill="#fff" />
    <rect y="18.5" width="24" height="1.85" fill="#fff" />
    <rect x="0" y="0" width="9.6" height="12.95" fill="#3C3B6E" />
    <g fill="#fff">
      <circle cx="2.4" cy="2.4" r="0.6" />
      <circle cx="4.8" cy="2.4" r="0.6" />
      <circle cx="7.2" cy="2.4" r="0.6" />
      <circle cx="1.2" cy="4.8" r="0.6" />
      <circle cx="3.6" cy="4.8" r="0.6" />
      <circle cx="6" cy="4.8" r="0.6" />
      <circle cx="8.4" cy="4.8" r="0.6" />
      <circle cx="2.4" cy="7.2" r="0.6" />
      <circle cx="4.8" cy="7.2" r="0.6" />
      <circle cx="7.2" cy="7.2" r="0.6" />
      <circle cx="1.2" cy="9.6" r="0.6" />
      <circle cx="3.6" cy="9.6" r="0.6" />
      <circle cx="6" cy="9.6" r="0.6" />
      <circle cx="8.4" cy="9.6" r="0.6" />
      <circle cx="2.4" cy="12" r="0.6" />
      <circle cx="4.8" cy="12" r="0.6" />
      <circle cx="7.2" cy="12" r="0.6" />
    </g>
  </svg>
);

export const JapaneseFlagIcon: React.FC<IconProps> = ({
  className = '',
  width = 24,
  height = 24,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="2" fill="#fff" />
    <circle cx="12" cy="12" r="7.2" fill="#BC002D" />
  </svg>
);

export const VietnameseFlagIcon: React.FC<IconProps> = ({
  className = '',
  width = 24,
  height = 24,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" rx="2" fill="#DA251D" />
    <polygon
      points="12,4 14.5,9.5 20,9.5 15.5,13.5 17,19 12,15.5 7,19 8.5,13.5 4,9.5 9.5,9.5"
      fill="#FFCD00"
    />
  </svg>
);
