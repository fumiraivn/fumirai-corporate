import { Button, ButtonType } from '@/components/base';

import { Tooltip } from 'antd';

import styles from './styles.module.scss';

export type JobPosition = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  benefits: string[];
  downloadText?: string;
  requirementsTitle?: string;
  benefitsTitle?: string;
};

export type JobCardProps = {
  job: JobPosition;
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className={styles.jobCard}>
      <div className={styles.cardHeader}>
        <Tooltip title={job.title}>
          <h3 className={styles.jobTitle}>{job.title}</h3>
        </Tooltip>
        <Tooltip title={job.description}>
          <p className={styles.jobDescription}>{job.description}</p>
        </Tooltip>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>{job.requirementsTitle}</h4>
          <ul className={styles.requirementList}>
            {job.requirements.map((requirement, index) => (
              <li key={index} className={styles.requirementItem}>
                {requirement}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>{job.benefitsTitle}</h4>
          <ul className={styles.benefitList}>
            {job.benefits.map((benefit, index) => (
              <li key={index} className={styles.benefitItem}>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <Button buttonType={ButtonType.Default} className={styles.applyButton}>
          {job.downloadText}
        </Button>
      </div>
    </div>
  );
}
