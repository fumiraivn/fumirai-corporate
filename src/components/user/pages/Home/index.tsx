'use client';

import { Container } from '@/components/base';
import { useScrollToHash } from '@/hooks/useScrollToHash';

import { useTranslations } from 'next-intl';

import AboutCompany from './AboutCompany';
import Customers from './Customers';
import InfoCard from './InfoCard';
import OurServices from './OurServices';
import TeamMembers from './TeamMembers';
import styles from './styles.module.scss';

export default function HomePage() {
  const t = useTranslations('homePage');
  const tOurCompany = useTranslations('homePage.aboutCompany.ourCompany.labels');
  const tParentCompany = useTranslations('homePage.aboutCompany.parentCompany.labels');
  const tParentValues = useTranslations('homePage.aboutCompany.parentCompany.values');

  // Handle scrolling to section based on URL hash
  useScrollToHash();

  const ourCompanyInfo = [
    { label: tOurCompany('companyName'), value: 'FUMIRAI COMPANY LIMITED' },
    {
      label: tOurCompany('taxAddress'),
      value: 'Tầng 3, số 35 Thái Phiên, Phường Hải Châu, TP Đà Nẵng, Việt Nam',
    },
    { label: tOurCompany('taxCode'), value: '0402302956' },
    { label: tOurCompany('phone'), value: '0385-135-531' },
    { label: tOurCompany('operationDate'), value: '2025-10-09' },
  ];

  const parentCompanyInfo = [
    { label: tParentCompany('companyName'), value: 'Fulfillments Ltd.' },
    {
      label: tParentCompany('address'),
      value:
        '〒103-0025 東京都中央区日本橋茅場町2-7-4 Aster茅場町9F 東京メトロ茅場町5番出口から徒歩0分',
    },
    { label: tParentCompany('email'), value: 'info@fulfillments.co.jp' },
    { label: tParentCompany('establishmentDate'), value: '2013年2月14日' },
    { label: tParentCompany('leadership'), value: `${tParentValues('leadership')} 宇野 文康` },
  ];

  return (
    <div className={styles.homePage}>
      {/* Home section for navigation */}
      <div id="home" />
      <Container>
        <InfoCard
          id="our-services"
          title={t('ourServices.title')}
          subtitle={t('ourServices.subtitle')}
          position="center"
        >
          <OurServices />
        </InfoCard>
      </Container>

      <Container isFullWidth className={styles.aboutOurCompanyContainerFull}>
        <Container className={styles.aboutOurCompanyContainer}>
          <InfoCard id="about-us" title={t('aboutCompany.ourCompany.title')}>
            <AboutCompany companyInfo={ourCompanyInfo} />
          </InfoCard>
          <InfoCard title={t('aboutCompany.parentCompany.title')}>
            <AboutCompany companyInfo={parentCompanyInfo} />
          </InfoCard>
        </Container>
      </Container>

      <Container isFullWidth>
        <InfoCard
          title={t('customers.title')}
          id="customers"
          subtitle={t('customers.subtitle')}
          position="center"
        >
          <Customers />
        </InfoCard>
      </Container>

      <Container>
        <InfoCard
          id="team-members"
          title={t('teamMembers.title')}
          subtitle={t('teamMembers.subtitle')}
          position="center"
        >
          <TeamMembers />
        </InfoCard>
      </Container>
    </div>
  );
}
