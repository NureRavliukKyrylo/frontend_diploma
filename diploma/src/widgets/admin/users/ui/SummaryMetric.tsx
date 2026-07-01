import { Skeleton } from "@heroui/react";
import type { AdminUsersStyles } from "../model/types";
import { useTranslation } from "react-i18next";

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
}: SummaryMetricProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={`${styles.metricCard} ${styles[`metricCard_${tone}`]}`}>
      <span className={styles.metricDeco} aria-hidden="true" />
      <div className={styles.metricBody}>
        <span className={styles.metricLabel}>{label}</span>
        {isLoading ? (
          <Skeleton className={styles.metricValueSkeleton} />
        ) : isError ? (
          <span className={styles.metricValueError}>
            {t("common.unavailable")}
          </span>
        ) : (
          <span className={styles.metricValue}>{value}</span>
        )}
      </div>
    </div>
  );
};
