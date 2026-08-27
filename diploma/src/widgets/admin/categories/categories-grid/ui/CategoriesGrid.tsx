import { Skeleton } from "@heroui/react";
import { Plus } from "lucide-react";
import {
  categoryFallbackGradient,
  type AdminCategoryCardData,
} from "../../lib/categoryVisuals";
import styles from "./CategoriesGrid.module.scss";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("admin");
  if (isError) {
    return (
      <div className={styles.stateCard}>
        <strong>{t("categories.states.errorTitle")}</strong>
        <span>{t("categories.states.errorText")}</span>
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
          <span className={styles.newCategoryEyebrow}>
            {t("categories.createCard.action")}
          </span>
          <span className={styles.newCategoryIcon}>
            <Plus size={24} aria-hidden="true" />
          </span>
          <span className={styles.newCategoryTitle}>
            {t("categories.createCard.title")}
          </span>
          <span className={styles.newCategoryDescription}>
            {t("categories.createCard.description")}
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
