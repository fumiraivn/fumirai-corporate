import { PropsWithChildren } from 'react';

import { Container } from '@/components/base';

import clsx from 'clsx';

import styles from './styles.module.scss';

export type InfoCardProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export default function InfoCard({ title, subtitle, children }: InfoCardProps) {
  return (
    <Container>
      <h3 className={clsx(styles.title)}>{title}</h3>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      <div>{children}</div>
    </Container>
  );
}
