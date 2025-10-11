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
        'https://cdn.kienthuc.net.vn/images/1eb0f177c696a050b8dfc7cdee839c133d3eae7942d092094c16c9132dcbab4258e87ce426d6322f18050a28a2f196d0/7-5221.jpg',
    },
    {
      id: 2,
      name: 'Kevin Haley',
      position: t('coFounderCto'),
      image:
        'https://media.vietnamplus.vn/images/7255a701687d11cb8c6bbc58a6c80785bd9edd1a359a9184cd24925cb299c1eeef0495174ca413094a0ac67facb8afe125029e88949048e50771a1f3365b2795ff8045ef53dc102f35ed3818de529c97a34592975c35ab018ae2b462eebe578b62dab1d84619de60ac7fa1c04e4ad1da/20180907_Park_Min_Young_Thu_ky_Kim_thoi_trang_cong_so_DepOnline_01.jpg',
    },
    {
      id: 3,
      name: 'Alishia Fulton',
      position: t('chiefCreativeOfficer'),
      image: 'https://media3.scdn.vn/img4/2021/10_03/zW0jXSyKxTFkKYd4jkuk.jpg',
    },
    {
      id: 4,
      name: 'David Chen',
      position: t('leadDeveloper'),
      image:
        'https://newsmd2fr.keeng.vn/tiin/archive/imageslead/2025/10/10/9xedwffnek2cvylhn40jb40q03mdbj76.jpg',
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
