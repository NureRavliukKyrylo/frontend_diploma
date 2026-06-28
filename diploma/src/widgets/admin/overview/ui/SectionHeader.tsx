import type { AdminOverviewStyles } from "../model/types";

interface SectionHeaderProps {
  styles: AdminOverviewStyles;
  title: string;
  note?: string;
}

export const SectionHeader = ({ styles, title, note }: SectionHeaderProps) =>
  note ? (
    <div className={styles.sectionHeaderBlock}>
      <div className={styles.sectionHeader}>
        <span>{title}</span>
        <span className={styles.sectionLine} aria-hidden="true" />
      </div>
      <span className={styles.sectionNote}>{note}</span>
    </div>
  ) : (
    <div className={styles.sectionHeader}>
      <span>{title}</span>
      <span className={styles.sectionLine} aria-hidden="true" />
    </div>
  );
