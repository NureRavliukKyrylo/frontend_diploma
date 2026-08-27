import { Skeleton } from "@heroui/react";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

interface MetricCardProps {
  label: string;
  value: string;
  tone: "pending" | "resolved" | "progress" | "priority";
  isLoading: boolean;
  isError: boolean;
}

export const MetricCard = ({
  label,
  value,
  tone,
  isLoading,
  isError,
}: MetricCardProps) => {
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
