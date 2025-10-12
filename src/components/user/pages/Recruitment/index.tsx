import { Container } from '@/components/base';

import { useTranslations } from 'next-intl';

import JobCard from './JobCard';
import styles from './styles.module.scss';

export default function RecruitmentPage() {
  const t = useTranslations('recruitmentPage');

  const jobPositions = [
    {
      id: 'developer',
      title: t('positions.developer.title'),
      description: t('positions.developer.description'),
      requirements: [
        t('positions.developer.requirements.experience'),
        t('positions.developer.requirements.skills'),
        t('positions.developer.requirements.language'),
        t('positions.developer.requirements.communication'),
      ],
      benefits: [
        t('positions.developer.benefits.salary'),
        t('positions.developer.benefits.workEnvironment'),
        t('positions.developer.benefits.training'),
        t('positions.developer.benefits.career'),
      ],
    },
    {
      id: 'tester',
      title: t('positions.tester.title'),
      description: t('positions.tester.description'),
      requirements: [
        t('positions.tester.requirements.experience'),
        t('positions.tester.requirements.skills'),
        t('positions.tester.requirements.attention'),
        t('positions.tester.requirements.teamwork'),
      ],
      benefits: [
        t('positions.tester.benefits.salary'),
        t('positions.tester.benefits.workEnvironment'),
        t('positions.tester.benefits.training'),
        t('positions.tester.benefits.career'),
      ],
    },
    {
      id: 'brse',
      title: t('positions.brse.title'),
      description: t('positions.brse.description'),
      requirements: [
        t('positions.brse.requirements.experience'),
        t('positions.brse.requirements.language'),
        t('positions.brse.requirements.communication'),
        t('positions.brse.requirements.analysis'),
      ],
      benefits: [
        t('positions.brse.benefits.salary'),
        t('positions.brse.benefits.workEnvironment'),
        t('positions.brse.benefits.training'),
        t('positions.brse.benefits.career'),
      ],
    },
    {
      id: 'other',
      title: t('positions.other.title'),
      description: t('positions.other.description'),
      requirements: [
        t('positions.other.requirements.experience'),
        t('positions.other.requirements.skills'),
        t('positions.other.requirements.adaptability'),
        t('positions.other.requirements.learning'),
      ],
      benefits: [
        t('positions.other.benefits.salary'),
        t('positions.other.benefits.workEnvironment'),
        t('positions.other.benefits.training'),
        t('positions.other.benefits.career'),
      ],
    },
  ];

  return (
    <div className={styles.recruitmentPage}>
      <Container>
        <div className={styles.header}>
          <h1 className={styles.title}>{t('title')}</h1>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={styles.jobGrid}>
          {jobPositions.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </Container>
    </div>
  );
}
