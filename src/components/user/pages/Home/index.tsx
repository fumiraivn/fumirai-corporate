'use client';

import { Container } from '@/components/base';
import { useScrollToHash } from '@/hooks';
import { EHomeSection, ELanguage, PageData } from '@/types';

import AboutCompany from './AboutCompany';
import { useAboutCompanyData } from './AboutCompany/hook';
import AboutUs from './AboutUs';
import { useAboutUsData } from './AboutUs/hook';
import InfoCard from './InfoCard';
import OurServices from './OurServices';
import { useOurServicesData } from './OurServices/hook';
import styles from './styles.module.scss';

type SectionKey = EHomeSection.ABOUT_US | EHomeSection.OUR_SERVICES | EHomeSection.OUR_COMPANY;

export default function HomePage({
  homeData,
  locale,
}: {
  homeData: PageData | null;
  locale: ELanguage;
}) {
  // Handle scrolling to section based on URL hash
  useScrollToHash();

  // Get blocks from homeData
  const blocks = homeData?.content || [];

  // Get data for each section using new hooks
  const { meta: aboutUsMeta, data: aboutUsData } = useAboutUsData(blocks, locale);
  const { meta: servicesMeta, data: servicesData } = useOurServicesData(blocks, locale);
  const { company, parent, companySubtitle, parentSubtitle } = useAboutCompanyData(blocks, locale);

  const defaultOrder: SectionKey[] = [
    EHomeSection.ABOUT_US,
    EHomeSection.OUR_SERVICES,
    EHomeSection.OUR_COMPANY,
  ];

  // Use block_id to determine order instead of card_type
  const derivedOrder: SectionKey[] = blocks
    .map((block) => {
      switch (block.block_id) {
        case 'about-us':
          return EHomeSection.ABOUT_US;
        case 'our-services':
          return EHomeSection.OUR_SERVICES;
        case 'our-company':
          return EHomeSection.OUR_COMPANY;
        default:
          return null;
      }
    })
    .filter((v): v is SectionKey => Boolean(v));

  const normalizedOrder: SectionKey[] = (derivedOrder.length ? derivedOrder : defaultOrder)
    .map((s) => String(s))
    .map((s) => s as SectionKey)
    .filter((s): s is SectionKey =>
      [EHomeSection.ABOUT_US, EHomeSection.OUR_SERVICES, EHomeSection.OUR_COMPANY].includes(s),
    );

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
          <InfoCard subtitle={companySubtitle}>
            <AboutCompany
              htmlItems={company?.items || []}
              mapUrl={company?.mapUrl}
              embedAddress={company?.embedAddress}
              mapHeight={380}
            />
          </InfoCard>
          <InfoCard subtitle={parentSubtitle}>
            <AboutCompany
              htmlItems={parent?.items || []}
              mapUrl={parent?.mapUrl}
              embedAddress={parent?.embedAddress}
              mapHeight={380}
            />
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
