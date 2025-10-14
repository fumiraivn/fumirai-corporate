'use client';

import styles from './styles.module.scss';

export type MapProps = {
  address: string;
  mapUrl?: string; // external Google Maps link for opening in a new tab
  height?: number; // height in pixels
};

export default function Map({ address, mapUrl, height = 380 }: MapProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div className={styles.mapSection}>
      <div className={styles.header}>
        {mapUrl ? (
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>
            View on Google Maps
          </a>
        ) : null}
      </div>
      <div className={styles.mapWrapper} style={{ height }}>
        <iframe
          className={styles.iframe}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
