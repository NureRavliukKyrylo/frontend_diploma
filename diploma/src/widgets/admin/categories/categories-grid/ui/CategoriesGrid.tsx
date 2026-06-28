import { Skeleton } from "@heroui/react";
import { Plus } from "lucide-react";
import {
  categoryFallbackGradient,
  type AdminCategoryCardData,
} from "../../lib/categoryVisuals";
import styles from "./CategoriesGrid.module.scss";

interface CategoriesGridProps {
  categories: AdminCategoryCardData[];
  isLoading: boolean;
  isError: boolean;
  onCreate: () => void;
  onOpenCategory: (category: AdminCategoryCardData) => void;
}

export const CategoriesGrid = ({
  categories,
  isLoading,
  isError,
  onCreate,
  onOpenCategory,
}: CategoriesGridProps) => {
  if (isError) {
    return (
      <div className={styles.stateCard}>
        <strong>Categories unavailable</strong>
        <span>The categories endpoint could not be loaded.</span>
      </div>
    );
  }

  return (
    <div className={styles.categoriesGrid}>
      <button
        type="button"
        className={styles.newCategoryTile}
        onClick={onCreate}
      >
        <span className={styles.newCategoryDeco} aria-hidden="true" />
        <span className={styles.newCategoryDecoSmall} aria-hidden="true" />
        <span className={styles.newCategoryContent}>
          <span className={styles.newCategoryEyebrow}>Create</span>
          <span className={styles.newCategoryIcon}>
            <Plus size={24} aria-hidden="true" />
          </span>
          <span className={styles.newCategoryTitle}>New category</span>
          <span className={styles.newCategoryDescription}>
            Group related skills and make the directory easier to browse.
          </span>
        </span>
      </button>

      {isLoading
        ? Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className={styles.categoryCardSkeleton} />
          ))
        : categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={styles.categoryCard}
              style={{
                backgroundImage: category.imageUrl
                  ? `url(${category.imageUrl})`
                  : categoryFallbackGradient,
              }}
              onClick={() => onOpenCategory(category)}
            >
              <span className={styles.categoryNamePill}>{category.name}</span>
            </button>
          ))}
    </div>
  );
};
