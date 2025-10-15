'use client';

import { Container } from '@/components/base';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { EHomeSection } from '@/types';

import AboutCompany from './AboutCompany';
import AboutUs from './AboutUs';
import { useAboutUsData } from './AboutUs/hook';
import InfoCard from './InfoCard';
import { useOurCompanyData } from './OurCompany/hook';
import OurServices from './OurServices';
import { useOurServicesData } from './OurServices/hook';
import styles from './styles.module.scss';

type SectionKey = EHomeSection.ABOUT_US | EHomeSection.OUR_SERVICES | EHomeSection.OUR_COMPANY;

type HomeContentItem = { card_type?: `${EHomeSection}`[]; scroll_id?: string };

export default function HomePage({ content }: { content?: unknown[] }) {
  // Handle scrolling to section based on URL hash
  useScrollToHash();

  const blocks = (content as HomeContentItem[] | undefined) ?? [];
  const { meta: companyMeta, company, parent } = useOurCompanyData(blocks as unknown[]);

  const defaultOrder: SectionKey[] = [
    EHomeSection.ABOUT_US,
    EHomeSection.OUR_SERVICES,
    EHomeSection.OUR_COMPANY,
  ];
  const derivedOrder: SectionKey[] = blocks
    .map((c) => c.card_type?.[0])
    .filter((v): v is `${EHomeSection}` => Boolean(v)) as SectionKey[];
  const normalizedOrder: SectionKey[] = (derivedOrder.length ? derivedOrder : defaultOrder)
    .map((s) => String(s))
    .map((s) => s as SectionKey)
    .filter((s): s is SectionKey =>
      [EHomeSection.ABOUT_US, EHomeSection.OUR_SERVICES, EHomeSection.OUR_COMPANY].includes(s),
    );

  const { meta: aboutUsMeta, data: aboutUsData } = useAboutUsData(blocks as unknown[]);
  const { meta: servicesMeta, data: servicesData } = useOurServicesData(blocks as unknown[]);

  const sections: Record<SectionKey, React.ReactElement> = {
    [EHomeSection.ABOUT_US]: (
      <Container key="about-us">
        <InfoCard
          id={aboutUsMeta?.scroll_id}
          title={aboutUsMeta?.title}
          subtitle={aboutUsMeta?.subtitle}
          position="center"
        >
          <AboutUs title={aboutUsData?.title} items={aboutUsData?.items} />
        </InfoCard>
      </Container>
    ),
    [EHomeSection.OUR_SERVICES]: (
      <Container key="our-services">
        <InfoCard
          id={servicesMeta?.scroll_id}
          title={servicesMeta?.title}
          subtitle={servicesMeta?.subtitle}
          position="center"
        >
          <OurServices data={servicesData} />
        </InfoCard>
      </Container>
    ),
    [EHomeSection.OUR_COMPANY]: (
      <Container key="our-company">
        <Container className={styles.aboutOurCompanyContainer}>
          <InfoCard id={companyMeta?.scroll_id} subtitle={company?.title}>
            <AboutCompany companyInfo={company?.items || []} mapHeight={380} />
          </InfoCard>
          <InfoCard subtitle={parent?.title}>
            <AboutCompany companyInfo={parent?.items || []} mapHeight={380} />
          </InfoCard>
        </Container>
      </Container>
    ),
  };

  return (
    <div className={styles.homePage}>
      {/* Home section for navigation */}
      <div id="home" />
      {normalizedOrder.map((key) => sections[key])}
    </div>
  );
}
