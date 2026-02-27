import styles from "./CategoriesWidget.module.scss";
import { CategoryCardSkeleton } from "@entities/category";

interface CategoriesWidgetSkeletonProps {
  items?: number;
}

export const CategoriesWidgetSkeleton = ({
  items = 6,
}: CategoriesWidgetSkeletonProps) => {
  return (
    <div className={styles.categoriesWidgetBlock}>
      {Array.from({ length: items }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
};
