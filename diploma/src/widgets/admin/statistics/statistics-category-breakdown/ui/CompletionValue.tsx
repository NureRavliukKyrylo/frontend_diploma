import type { CategoryHeatmapItem } from "@entities/admin";
import { formatPercent } from "../../statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";

export const CompletionValue = ({ item }: { item: CategoryHeatmapItem }) => {
  if (item.tasksCount === 0) {
    return <span className={styles.completionDash}>-</span>;
  }

  const tone =
    item.completionRate >= 70
      ? "good"
      : item.completionRate >= 40
        ? "warn"
        : "bad";

  return (
    <span
      className={`${styles.completionPill} ${styles[`completion_${tone}`]}`}
    >
      {formatPercent(item.completionRate)}
    </span>
  );
};
