import { useMemo } from "react";
import dayjs from "dayjs";
import { Skeleton } from "@heroui/react";
import type { MonthlyGrowthPoint } from "@entities/admin";
import { growthRows } from "../../statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";

interface GrowthHeatTableProps {
  points: MonthlyGrowthPoint[];
  isLoading: boolean;
  isError: boolean;
}

export const GrowthHeatTable = ({
  points,
  isLoading,
  isError,
}: GrowthHeatTableProps) => {
  const maxByRow = useMemo(
    () =>
      growthRows.reduce<Record<string, number>>((acc, row) => {
        acc[row.key] = Math.max(1, ...points.map((point) => point[row.key]));
        return acc;
      }, {}),
    [points],
  );

  return (
    <div className={styles.growthCard}>
      <div className={styles.cardHeader}>
        <strong className={styles.growthTitle}>Monthly growth</strong>
        <span className={styles.growthSubtitle}>
          Six-month platform creation window
        </span>
      </div>
      {isLoading ? (
        <Skeleton className={styles.growthSkeleton} />
      ) : isError ? (
        <div className={styles.cardState}>Growth data unavailable.</div>
      ) : points.length === 0 ? (
        <div className={styles.cardState}>No growth data yet.</div>
      ) : (
        <div className={styles.growthTable}>
          <div className={styles.growthHeaderRow}>
            <span />
            {points.map((point) => (
              <span key={`${point.year}-${point.month}`}>
                {dayjs(`${point.year}-${point.month}-01`).format("MMM")}
              </span>
            ))}
          </div>
          {growthRows.map((row) => (
            <div key={row.key} className={styles.growthDataRow}>
              <span className={styles.growthRowLabel}>{row.label}</span>
              {points.map((point, index) => {
                const value = point[row.key];
                const intensity = Math.max(0.18, value / maxByRow[row.key]);
                const isCurrent = index === points.length - 1;

                return (
                  <span
                    key={`${row.key}-${point.year}-${point.month}`}
                    className={`${styles.growthCell} ${
                      isCurrent ? styles.growthCellCurrent : ""
                    }`}
                    style={{
                      background: isCurrent
                        ? row.solid
                        : `color-mix(in srgb, ${row.solid} ${
                            intensity * 48
                          }%, ${row.soft})`,
                    }}
                  >
                    {value}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
