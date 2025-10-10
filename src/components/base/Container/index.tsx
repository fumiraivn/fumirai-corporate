import styles from './styles.module.scss';

export interface ContainerProps {
  children: React.ReactNode;
  isFullWidth?: boolean;
}

export default function Container({ children, isFullWidth = false }: ContainerProps) {
  return (
    <div className={[styles.container, isFullWidth ? styles.fullWidth : undefined].join(' ')}>
      {children}
    </div>
  );
}
