import type { PropsWithChildren } from "react";
import styles from "../../../shared/filters/Filters.module.scss";

interface OrganizationProjectFiltersSectionProps extends PropsWithChildren {
  title: string;
  isActive: boolean;
  className: string;
  badge?: string;
}

export const OrganizationProjectFiltersSection = ({
  title,
  isActive,
  className,
  badge,
  children,
}: OrganizationProjectFiltersSectionProps) => {
  return (
    <div
      className={`${className} ${isActive ? styles.filterSectionActive : ""}`}
    >
      <div className={styles.sectionHeaderRow}>
        <h3 className={styles.subHeaderFilter}>{title}</h3>
        {badge ? <span className={styles.activeBadge}>{badge}</span> : null}
      </div>
      {children}
    </div>
  );
};
