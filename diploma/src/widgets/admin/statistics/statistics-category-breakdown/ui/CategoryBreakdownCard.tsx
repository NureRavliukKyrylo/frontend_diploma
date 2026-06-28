import {
  formatAdminHoursFromMinutes,
  type CategoryHeatmapItem,
} from "@entities/admin";
import { Skeleton } from "@heroui/react";
import { formatNumber } from "@widgets/admin/statistics/statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";
import { CompletionValue } from "./CompletionValue";

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
}: CategoryBreakdownCardProps) => (
  <div className={styles.categoryTableCard}>
    <div className={styles.categoryTableHeader}>
      <div>
        <strong className={styles.categoryTableTitle}>
          Category activity breakdown
        </strong>
        <span className={styles.categoryTableCaption}>
          Top activity categories for the selected range
        </span>
      </div>
      <span className={styles.categoryTableCaption}>
        {formatNumber(rows.length)} rows
      </span>
    </div>

    {isLoading ? (
      <Skeleton className={styles.categoryTableSkeleton} />
    ) : isError ? (
      <div className={styles.cardState}>Category heatmap unavailable.</div>
    ) : rows.length === 0 ? (
      <div className={styles.cardState}>No category activity found.</div>
    ) : (
      <div className={styles.categoryTable}>
        <div className={styles.categoryTableHeadRow}>
          <span>Category</span>
          <span>Events</span>
          <span>Tasks</span>
          <span>Completion</span>
          <span>Hours</span>
        </div>
        {rows.map((item) => (
          <div key={item.categoryId} className={styles.categoryTableRow}>
            <span className={styles.categoryName}>
              {item.categoryName ||
                categoryMap.get(item.categoryId) ||
                "Unknown category"}
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
