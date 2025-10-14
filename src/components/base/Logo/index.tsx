import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.scss';

export type LogoProps = {
  href: string;
  className?: string;
  imgSrc?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  text?: string;
};

export default function Logo({
  href,
  className,
  imgSrc = '/only_logo.png',
  alt = 'fumirai logo',
  width = 45,
  height = 45,
  priority = true,
  text = 'fumirai',
}: LogoProps) {
  return (
    <Link href={href} className={`${styles.logo} ${className || ''}`}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={styles.image}
        style={{ borderRadius: 0, width: 'auto', height: 'auto' }}
        priority={priority}
      />
      <span className={styles.text}>{text}</span>
    </Link>
  );
}
