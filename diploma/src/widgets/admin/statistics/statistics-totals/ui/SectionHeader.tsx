import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";

interface SectionHeaderProps {
  label: string;
  value?: string;
}

export const SectionHeader = ({ label, value }: SectionHeaderProps) => (
  <div className={styles.sectionHeader}>
    <span>{label}</span>
    <span className={styles.sectionLine} aria-hidden="true" />
    {value && <strong>{value}</strong>}
  </div>
);
