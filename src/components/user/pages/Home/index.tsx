import AboutOurCompany from './AboutOurCompany';
import InfoCard from './InfoCard';
import OurServices from './OurServices';
import WhyChooseUs from './WhyChooseUs';

export default function HomePage() {
  return (
    <>
      <InfoCard title="What We Provide" subtitle="Our Services" position="center">
        <OurServices />
      </InfoCard>
      <InfoCard
        title="About Our Company"
        subtitle="Providing Your Business With A Quality IT Service is Our Passion"
      >
        <AboutOurCompany />
      </InfoCard>
      <InfoCard
        title="Why Choose Us?"
        subtitle="Safeguard Your Brand with Cyber Security and IT Solutions"
      >
        <WhyChooseUs />
      </InfoCard>
    </>
  );
}
