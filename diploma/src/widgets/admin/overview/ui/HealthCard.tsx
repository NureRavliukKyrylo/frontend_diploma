import { Skeleton } from "@heroui/react";
import type { AdminOverviewStyles, HealthRow } from "../model/types";

interface HealthCardProps {
  styles: AdminOverviewStyles;
  healthRows: HealthRow[];
  healthScore: number;
  isLoading: boolean;
  isError: boolean;
}

const getDotClassName = (styles: AdminOverviewStyles, severity: HealthRow["severity"]) =>
  severity === "critical"
    ? styles.healthDotCritical
    : severity === "warning"
      ? styles.healthDotWarning
      : styles.healthDotOk;

const getStatusClassName = (
  styles: AdminOverviewStyles,
  severity: HealthRow["severity"],
) =>
  severity === "critical"
    ? styles.healthStatusCritical
    : severity === "warning"
      ? styles.healthStatusWarning
      : styles.healthStatusOk;

export const HealthCard = ({
  styles,
  healthRows,
  healthScore,
  isLoading,
  isError,
}: HealthCardProps) => (
  <div className={styles.healthCard}>
    <span className={styles.healthDeco} aria-hidden="true" />
    <div className={styles.healthBody}>
      <span className={styles.healthTitle}>System health</span>
      {isLoading ? (
        <Skeleton className={styles.healthRingSkeleton} />
      ) : isError ? (
        <div className={styles.healthState}>Health unavailable</div>
      ) : (
        <div
          className={styles.healthRing}
          aria-label={`System health ${healthScore} percent`}
        >
          <span className={styles.healthRingArc} aria-hidden="true" />
          <span className={styles.healthRingText}>{healthScore}%</span>
        </div>
      )}

      <div className={styles.healthRows}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={styles.healthRow}>
              <Skeleton className={styles.healthLabelSkeleton} />
              <Skeleton className={styles.healthStatusSkeleton} />
            </div>
          ))
        ) : isError ? (
          <div className={styles.healthState}>
            Unable to load system health.
          </div>
        ) : (
          healthRows.map((row) => (
            <div key={`${row.label}-${row.status}`} className={styles.healthRow}>
              <span className={styles.healthLabel}>
                <span
                  className={`${styles.healthDot} ${getDotClassName(
                    styles,
                    row.severity,
                  )}`}
                  aria-hidden="true"
                />
                {row.label}
              </span>
              <span className={getStatusClassName(styles, row.severity)}>
                {row.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);
