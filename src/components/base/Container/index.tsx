import styles from './styles.module.scss';

export interface ContainerProps {
  children: React.ReactNode;
  isFullWidth?: boolean;
  className?: string;
}

export default function Container({
  children,
  isFullWidth = false,
  className = '',
}: ContainerProps) {
  return (
    <div
      className={[styles.container, isFullWidth ? styles.fullWidth : undefined, className].join(
        ' ',
      )}
    >
      {children}
    </div>
  );
}
