import Image from 'next/image';

import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
}

export default function TeamMembers() {
  const t = useTranslations('homePage.teamMembers.positions');

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Ava Farrington',
      position: t('founderCeo'),
      image:
        'https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-attorney-male-staff-court-call-during-the-day-image_784854.jpg',
    },
    {
      id: 2,
      name: 'Kevin Haley',
      position: t('coFounderCto'),
      image: 'https://thumb.photo-ac.com/d6/d60fb2ac7e0d8ed7e5929b70cc6275ef_t.jpeg',
    },
    {
      id: 3,
      name: 'Alishia Fulton',
      position: t('chiefCreativeOfficer'),
      image:
        'https://png.pngtree.com/background/20211216/original/pngtree-business-woman-daytime-uniform-girl-office-work-arrangement-photography-map-with-picture-image_1522811.jpg',
    },
    {
      id: 4,
      name: 'David Chen',
      position: t('leadDeveloper'),
      image:
        'https://png.pngtree.com/thumb_back/fh260/background/20210903/pngtree-teacher-daytime-male-teacher-indoor-character-photography-picture-with-picture-image_800525.jpg',
    },
  ];
  return (
    <div className={styles.teamMembers}>
      <div className={styles.teamGrid}>
        {teamMembers.map((member) => (
          <div key={member.id} className={styles.teamCard}>
            <div className={styles.imageContainer}>
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={350}
                className={styles.memberImage}
                quality={95}
                priority={false}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </div>
            <div className={styles.memberInfo}>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberPosition}>{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
