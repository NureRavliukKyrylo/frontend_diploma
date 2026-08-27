import {
  formatAdminHoursFromMinutes,
  type CategoryHeatmapItem,
} from "@entities/admin";
import { Skeleton } from "@heroui/react";
import { formatNumber } from "@widgets/admin/statistics/statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";
import { CompletionValue } from "./CompletionValue";
import { useTranslation } from "react-i18next";

interface CategoryBreakdownCardProps {
  rows: CategoryHeatmapItem[];
  categoryMap: Map<string, string>;
  isLoading: boolean;
  isError: boolean;
}

export const CategoryBreakdownCard = ({
  rows,
  categoryMap,
  isLoading,
  isError,
}: CategoryBreakdownCardProps) => {
  const { t } = useTranslation("admin");

  return (
    <div className={styles.categoryTableCard}>
      <div className={styles.categoryTableHeader}>
        <div>
          <strong className={styles.categoryTableTitle}>
            {t("statistics.categories.title")}
          </strong>
          <span className={styles.categoryTableCaption}>
            {t("statistics.categories.subtitle")}
          </span>
        </div>
        <span className={styles.categoryTableCaption}>
          {formatNumber(rows.length)} {t("statistics.categories.rows")}
        </span>
      </div>

      {isLoading ? (
        <Skeleton className={styles.categoryTableSkeleton} />
      ) : isError ? (
        <div className={styles.cardState}>
          {t("statistics.categories.unavailable")}
        </div>
      ) : rows.length === 0 ? (
        <div className={styles.cardState}>
          {t("statistics.categories.empty")}
        </div>
      ) : (
        <div className={styles.categoryTable}>
          <div className={styles.categoryTableHeadRow}>
            <span>{t("statistics.categories.category")}</span>
            <span>{t("statistics.categories.events")}</span>
            <span>{t("statistics.categories.tasks")}</span>
            <span>{t("statistics.categories.completion")}</span>
            <span>{t("statistics.categories.hours")}</span>
          </div>
          {rows.map((item) => (
            <div key={item.categoryId} className={styles.categoryTableRow}>
              <span className={styles.categoryName}>
                {item.categoryName ||
                  categoryMap.get(item.categoryId) ||
                  t("statistics.categories.unknown")}
              </span>
              <span className={styles.categoryNumber}>
                {formatNumber(item.eventsCount)}
              </span>
              <span className={styles.categoryNumber}>
                {formatNumber(item.tasksCount)}
              </span>
              <span className={styles.categoryNumber}>
                <CompletionValue item={item} />
              </span>
              <span className={styles.categoryHoursValue}>
                {formatAdminHoursFromMinutes(item.confirmedMinutes)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
