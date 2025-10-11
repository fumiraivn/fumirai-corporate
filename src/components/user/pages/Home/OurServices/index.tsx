import { PropsWithChildren } from 'react';

import Image from 'next/image';

import { useTranslations } from 'next-intl';

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

export default function OurServices({ data }: OurServicesProps) {
  const t = useTranslations('homePage.ourServices.services');

  const defaultServices: ServiceItem[] = [
    {
      id: 'web-dev',
      title: t('webDev.title'),
      description: t('webDev.description'),
      icon: '/window.svg',
    },
    {
      id: 'digital-marketing',
      title: t('digitalMarketing.title'),
      description: t('digitalMarketing.description'),
      icon: '/globe.svg',
    },
    {
      id: 'startup-solutions',
      title: t('startupSolutions.title'),
      description: t('startupSolutions.description'),
      icon: '/next.svg',
    },
    {
      id: 'networking-services',
      title: t('networkingServices.title'),
      description: t('networkingServices.description'),
      icon: '/globe.svg',
    },
    {
      id: 'seo-optimization',
      title: t('seoOptimization.title'),
      description: t('seoOptimization.description'),
      icon: '/file.svg',
    },
    {
      id: 'apps-development',
      title: t('appsDevelopment.title'),
      description: t('appsDevelopment.description'),
      icon: '/window.svg',
    },
  ];

  const servicesData = data || defaultServices;
  return (
    <div className={styles.ourServices}>
      <div className={styles.grid}>
        {servicesData.map((item) => (
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
