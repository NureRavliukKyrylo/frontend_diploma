import { ListProjectCardSkeleton } from "@entities/project";
import styles from "./CombinedListWidget.module.scss";

interface CombinedListWidgetSkeletonProps {
  items?: number;
}

export const CombinedListWidgetSkeleton = ({
  items = 6,
}: CombinedListWidgetSkeletonProps) => {
  return (
    <div className={styles.combinedListWidget}>
      {Array.from({ length: items }).map((_, i) => (
        <ListProjectCardSkeleton key={i} />
      ))}
    </div>
  );
};
