import { Skeleton } from "@heroui/react";
import type { AdminUsersStyles } from "../model/types";

interface SummaryMetricProps {
  styles: AdminUsersStyles;
  label: string;
  value: string;
  tone: "users" | "verified" | "unverified" | "banned";
  isLoading: boolean;
  isError: boolean;
}

export const SummaryMetric = ({
  styles,
  label,
  value,
  tone,
  isLoading,
  isError,
}: SummaryMetricProps) => (
  <div className={`${styles.metricCard} ${styles[`metricCard_${tone}`]}`}>
    <span className={styles.metricDeco} aria-hidden="true" />
    <div className={styles.metricBody}>
      <span className={styles.metricLabel}>{label}</span>
      {isLoading ? (
        <Skeleton className={styles.metricValueSkeleton} />
      ) : isError ? (
        <span className={styles.metricValueError}>Unavailable</span>
      ) : (
        <span className={styles.metricValue}>{value}</span>
      )}
    </div>
  </div>
);
