import { Container } from '@/components/base';

import JobCard, { JobPosition } from './JobCard';
import styles from './styles.module.scss';

type ListText = {
  fieldId?: 'list_text';
  title?: string;
  items?: { fieldId?: 'info'; value?: string }[];
};
type CardRecruitment = {
  fieldId?: 'card-recruitment';
  title?: string;
  description?: string;
  requirements?: ListText[];
  benefits?: ListText[];
  download_text?: string;
};
type RecruitmentBlock = {
  fieldId?: 'card';
  title?: string;
  description?: string;
  cards?: (CardRecruitment | Record<string, unknown>)[];
};

export default function RecruitmentPage({ content }: { content?: unknown[] }) {
  const blocks = (content as RecruitmentBlock[] | undefined) ?? [];
  const header = blocks.find((b) => b.fieldId === 'card');
  const cards = (header?.cards as CardRecruitment[] | undefined) ?? [];

  const toItems = (sections?: ListText[]) =>
    (sections || [])
      .flatMap((s) => s.items || [])
      .filter((i) => i?.fieldId === 'info')
      .map((i) => (i?.value || '').trim())
      .filter((s) => !!s);

  const getSectionTitle = (sections?: ListText[]) => (sections && sections[0]?.title) || undefined;

  const jobs: JobPosition[] = cards.map((c, idx) => ({
    id: `job-${idx}`,
    title: c?.title || '',
    description: c?.description || '',
    requirements: toItems(c?.requirements),
    benefits: toItems(c?.benefits),
    downloadText: c?.download_text || undefined,
    requirementsTitle: getSectionTitle(c?.requirements),
    benefitsTitle: getSectionTitle(c?.benefits),
  }));

  return (
    <div className={styles.recruitmentPage}>
      <Container>
        <div className={styles.header}>
          <h1 className={styles.title}>{header?.title}</h1>
          <p className={styles.subtitle}>{header?.description}</p>
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
