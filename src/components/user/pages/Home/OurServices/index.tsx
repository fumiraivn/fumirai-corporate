import { PropsWithChildren } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import styles from './styles.module.scss';

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon?: string; // public path under /public
};

export type OurServicesProps = PropsWithChildren<{
  data?: ServiceItem[];
  position?: 'left' | 'right' | 'center';
}>;

const defaultServices: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua',
    icon: '/window.svg',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua',
    icon: '/globe.svg',
  },
  {
    id: 'startup-solutions',
    title: 'Startup Solutions',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua',
    icon: '/next.svg',
  },
  {
    id: 'networking-services',
    title: 'Networking Services',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua',
    icon: '/globe.svg',
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua',
    icon: '/file.svg',
  },
  {
    id: 'apps-development',
    title: 'Apps Development',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua',
    icon: '/window.svg',
  },
];

export default function OurServices({ data = defaultServices }: OurServicesProps) {
  return (
    <div className={styles.ourServices}>
      <div className={styles.grid}>
        {data.map((item) => (
          <div key={item.id} className={styles.card}>
            {item.icon ? (
              <div className={styles.iconWrapper}>
                <Image src={item.icon} alt={item.title} width={40} height={40} />
              </div>
            ) : null}
            <h4 className={styles.cardTitle}>{item.title}</h4>
            <p className={styles.cardDesc}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
