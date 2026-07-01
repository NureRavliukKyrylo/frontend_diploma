import { useMemo } from "react";
import dayjs from "dayjs";
import { Skeleton } from "@heroui/react";
import type { MonthlyGrowthPoint } from "@entities/admin";
import { growthRows } from "../../statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation("admin");
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
        <strong className={styles.growthTitle}>
          {t("statistics.growth.title")}
        </strong>
        <span className={styles.growthSubtitle}>
          {t("statistics.growth.subtitle")}
        </span>
      </div>
      {isLoading ? (
        <Skeleton className={styles.growthSkeleton} />
      ) : isError ? (
        <div className={styles.cardState}>
          {t("statistics.growth.unavailable")}
        </div>
      ) : points.length === 0 ? (
        <div className={styles.cardState}>{t("statistics.growth.empty")}</div>
      ) : (
        <div className={styles.growthTable}>
          <div className={styles.growthHeaderRow}>
            <span />
            {points.map((point) => (
              <span key={`${point.year}-${point.month}`}>
                {new Intl.DateTimeFormat(
                  i18n.resolvedLanguage === "uk" ? "uk-UA" : "en-US",
                  { month: "short" },
                ).format(dayjs(`${point.year}-${point.month}-01`).toDate())}
              </span>
            ))}
          </div>
          {growthRows.map((row) => (
            <div key={row.key} className={styles.growthDataRow}>
              <span className={styles.growthRowLabel}>{t(row.label)}</span>
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
