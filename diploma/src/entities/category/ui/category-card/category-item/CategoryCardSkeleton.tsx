import { Skeleton } from "@heroui/react";
import styles from "./CategoryCard.module.scss";

export const CategoryCardSkeleton = () => {
  return (
    <div className={styles.categoryCardWrapper}>
      <Skeleton className={styles.imageSkeleton} />

      <div className={styles.categoryNameBlock}>
        <Skeleton className={styles.textSkeleton} />
      </div>
    </div>
  );
};
