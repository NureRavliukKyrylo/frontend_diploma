import { Skeleton } from "@heroui/react";
import type { AdminBansStyles } from "../model/types";
import { useTranslation } from "react-i18next";

interface BanMetricProps {
  styles: AdminBansStyles;
  label: string;
  value: string;
  tone: "active" | "soon" | "permanent";
  isLoading: boolean;
  isError: boolean;
}

export const BanMetric = ({
  styles,
  label,
  value,
  tone,
  isLoading,
  isError,
}: BanMetricProps) => {
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
