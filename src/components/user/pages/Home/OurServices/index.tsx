import { PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export type OurServicesProps = PropsWithChildren<{
  data?: [];
}>;

export default function OurServices({ data = [] }: OurServicesProps) {
  return <div className={styles.ourServices}>Our Services {data.length}</div>;
}
