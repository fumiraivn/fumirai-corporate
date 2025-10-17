import { Container } from '@/components/base';
import { BlockContent, ELanguage } from '@/types';

import JobCard from './JobCard';
import { useRecruitmentData } from './hook';
import styles from './styles.module.scss';

export default function RecruitmentPage({
  recruitmentData,
  locale,
}: {
  recruitmentData: { content?: BlockContent[] };
  locale: ELanguage;
}) {
  // Get blocks from recruitmentData
  const blocks = recruitmentData?.content || [];

  // Use the new hook to get recruitment data
  const { meta, jobs } = useRecruitmentData(blocks, locale);

  return (
    <div className={styles.recruitmentPage}>
      <Container>
        <div className={styles.header}>
          <h1 className={styles.title}>{meta.title}</h1>
          <p className={styles.subtitle}>{meta.subtitle}</p>
        </div>

        <div className={styles.jobGrid}>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </Container>
    </div>
  );
}
