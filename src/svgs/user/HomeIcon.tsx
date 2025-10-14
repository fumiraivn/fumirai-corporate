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
    style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
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

export const MenuIcon: React.FC<IconProps> = ({ className = '', width = 24, height = 24 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" />
    <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
    <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" />
  </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ className = '', width = 24, height = 24 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const YouTubeIcon: React.FC<IconProps> = ({ className = '', width = 24, height = 24 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ className = '', width = 24, height = 24 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = ({ className = '', width = 24, height = 24 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 19V5M5 12L12 5L19 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({
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
    <path
      d="M5 12h14M13 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowDownIcon: React.FC<IconProps> = ({ className = '', width = 24, height = 24 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5v14M5 12l7 7 7-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
