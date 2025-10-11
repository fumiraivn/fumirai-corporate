import { Container } from '@/components/base';

import AboutCompany from './AboutCompany';
import Customers from './Customers';
import InfoCard from './InfoCard';
import OurServices from './OurServices';
import TeamMembers from './TeamMembers';
import styles from './styles.module.scss';

export default function HomePage() {
  const ourCompanyInfo = [
    { label: 'Tên công ty', value: 'FUMIRAI COMPANY LIMITED' },
    {
      label: 'Địa chỉ Thuế',
      value: 'Tầng 3, số 35 Thái Phiên, Phường Hải Châu, TP Đà Nẵng, Việt Nam',
    },
    { label: 'Mã số thuế', value: '0402302956' },
    { label: 'Điện thoại', value: '0385-135-531' },
    { label: 'Ngày hoạt động', value: '2025-10-09' },
  ];

  const parentCompanyInfo = [
    { label: 'Tên công ty', value: 'Fulfillments Ltd.' },
    {
      label: 'Địa chỉ',
      value:
        '〒103-0025 東京都中央区日本橋茅場町2-7-4 Aster茅場町9F 東京メトロ茅場町5番出口から徒歩0分',
    },
    { label: 'Email', value: 'info@fulfillments.co.jp' },
    { label: 'Ngày thành lập', value: '2013年2月14日' },
    { label: 'Ban lãnh đạo', value: '代表取締役　宇野 文康' },
  ];

  return (
    <div className={styles.homePage}>
      <Container>
        <InfoCard
          id="our-services"
          title="What We Provide"
          subtitle="Our Services"
          position="center"
        >
          <OurServices />
        </InfoCard>
      </Container>

      <Container isFullWidth className={styles.aboutOurCompanyContainerFull}>
        <Container className={styles.aboutOurCompanyContainer}>
          <InfoCard id="about-us" title="Thông tin về chúng tôi">
            <AboutCompany companyInfo={ourCompanyInfo} />
          </InfoCard>
          <InfoCard title="Công ty mẹ tại Nhật Bản">
            <AboutCompany companyInfo={parentCompanyInfo} />
          </InfoCard>
        </Container>
      </Container>

      <Container isFullWidth>
        <InfoCard
          title="Khách hàng của chúng tôi"
          id="customers"
          subtitle="Đối tác của nhiều doanh nghiệp đầu tại Nhật Bản"
          position="center"
        >
          <Customers />
        </InfoCard>
      </Container>

      <Container>
        <InfoCard
          id="team-members"
          title="Đội ngũ nhân sự"
          subtitle="Ban giám đốc"
          position="center"
        >
          <TeamMembers />
        </InfoCard>
      </Container>
    </div>
  );
}
