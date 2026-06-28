import { Skeleton } from "@heroui/react";
import type { TotalCardItem } from "../../statistics-config/libs/statisticsFormat";
import styles from "../../statistics-page-styles/AdminStatisticsPage.module.scss";

export const TotalCard = ({ item }: { item: TotalCardItem }) => (
  <div className={`${styles.totalCard} ${styles[`totalCard_${item.tone}`]}`}>
    <span className={styles.totalCardDeco} aria-hidden="true" />
    <span className={styles.totalCardLabel}>{item.label}</span>
    {item.isLoading ? (
      <Skeleton className={styles.totalCardSkeleton} />
    ) : item.isError ? (
      <span className={styles.totalCardError}>Unavailable</span>
    ) : (
      <strong className={styles.totalCardValue}>{item.value}</strong>
    )}
  </div>
);
