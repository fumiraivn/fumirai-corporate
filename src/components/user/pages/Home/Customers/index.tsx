'use client';

import Image from 'next/image';

import styles from './styles.module.scss';

export default function Customers() {
  // Tạo danh sách URL hình ảnh từ client-1.png đến client-9.png
  const customerImages = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    url: `https://cutesolution.com/html/techvio/assets/img/partner/client-${index + 1}.png`,
    alt: `Customer ${index + 1}`,
  }));

  // Duplicate images để tạo hiệu ứng loop liên tục
  const duplicatedImages = [...customerImages, ...customerImages, ...customerImages];

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <div className={styles.scrollContainer}>
          <div className={styles.scrollContent}>
            {duplicatedImages.map((customer, index) => (
              <div key={`${customer.id}-${index}`} className={styles.imageWrapper}>
                <div className={styles.imageContainer}>
                  <Image
                    src={customer.url}
                    alt={customer.alt}
                    width={180}
                    height={180}
                    className={styles.customerImage}
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
