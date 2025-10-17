import { Button, ButtonType } from '@/components/base';

import { Tooltip } from 'antd';

import { JobPosition } from '../hook';

import styles from './styles.module.scss';

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
        <div className={styles.htmlContent} dangerouslySetInnerHTML={{ __html: job.content }} />
      </div>

      <div className={styles.cardFooter}>
        <Button buttonType={ButtonType.Default} className={styles.applyButton}>
          Apply Now
        </Button>
      </div>
    </div>
  );
}
