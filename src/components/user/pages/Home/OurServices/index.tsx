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
    title: 'Phát Triển Website',
    description:
      'Thiết kế và phát triển website chuyên nghiệp, responsive với công nghệ hiện đại, tối ưu trải nghiệm người dùng và hiệu suất cao',
    icon: '/window.svg',
  },
  {
    id: 'digital-marketing',
    title: 'Marketing Số',
    description:
      'Chiến lược marketing toàn diện trên các nền tảng số, tăng cường nhận diện thương hiệu và thu hút khách hàng tiềm năng',
    icon: '/globe.svg',
  },
  {
    id: 'startup-solutions',
    title: 'Giải Pháp Khởi Nghiệp',
    description:
      'Hỗ trợ toàn diện cho các startup từ ý tưởng đến thực thi, bao gồm tư vấn chiến lược, phát triển sản phẩm và kết nối đầu tư',
    icon: '/next.svg',
  },
  {
    id: 'networking-services',
    title: 'Dịch Vụ Mạng',
    description:
      'Thiết kế và triển khai hệ thống mạng doanh nghiệp, đảm bảo kết nối ổn định, bảo mật cao và hiệu suất tối ưu',
    icon: '/globe.svg',
  },
  {
    id: 'seo-optimization',
    title: 'Tối Ưu SEO',
    description:
      'Tối ưu hóa công cụ tìm kiếm, nâng cao thứ hạng website trên Google, tăng lưu lượng truy cập tự nhiên và chuyển đổi khách hàng',
    icon: '/file.svg',
  },
  {
    id: 'apps-development',
    title: 'Phát Triển Ứng Dụng',
    description:
      'Phát triển ứng dụng di động và desktop đa nền tảng, từ thiết kế UI/UX đến triển khai và bảo trì hệ thống',
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
