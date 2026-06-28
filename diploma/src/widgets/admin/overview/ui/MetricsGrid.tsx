import { Skeleton } from "@heroui/react";
import type { AdminOverviewStyles, MetricCard } from "../model/types";

interface MetricsGridProps {
  styles: AdminOverviewStyles;
  metrics: MetricCard[];
}

export const MetricsGrid = ({ styles, metrics }: MetricsGridProps) => (
  <div className={styles.metricsGrid}>
    {metrics.map((metric) => (
      <div
        key={metric.label}
        className={`${styles.metricCard} ${styles[`metricCard_${metric.tone}`]}`}
      >
        <span className={styles.metricDeco} aria-hidden="true" />
        <div className={styles.metricBody}>
          <span className={styles.metricLabel}>{metric.label}</span>
          {metric.isLoading ? (
            <Skeleton className={styles.metricValueSkeleton} />
          ) : metric.isError ? (
            <span className={styles.metricValueError}>Unavailable</span>
          ) : (
            <span
              className={`${styles.metricValue} ${
                metric.accent ? styles.metricValueAccent : ""
              }`}
            >
              {metric.value}
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
);
