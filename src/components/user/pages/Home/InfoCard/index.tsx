import { PropsWithChildren } from 'react';

import clsx from 'clsx';

import styles from './styles.module.scss';

export type InfoCardProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  position?: 'left' | 'right' | 'center';
}>;

export default function InfoCard({ title, subtitle, children, position = 'left' }: InfoCardProps) {
  return (
    <div className={styles.infoCard}>
      <div className={clsx(styles.header, styles[position])}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
