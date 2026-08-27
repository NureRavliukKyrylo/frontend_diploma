import styles from "./RoleSections.module.scss";

interface SectionHeaderProps {
  title: string;
  count: number;
}

export const SectionHeader = ({ title, count }: SectionHeaderProps) => (
  <div className={styles.sectionHeader}>
    <span className={styles.sectionTitle}>{title}</span>
    <span className={styles.sectionLine} />
    <span className={styles.sectionBadge}>{count}</span>
  </div>
);
