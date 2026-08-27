import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import type { Category } from "@entities/category";
import styles from "../../../shared/filters/Filters.module.scss";
import { OrganizationProjectFiltersSection } from "./Section";

interface OrganizationProjectCategoryFilterSectionProps {
  categories: Category[];
  selectedCategoryIds: string[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onToggleCategory: (categoryId: string) => void;
  onFetchNextPage: () => void;
}

export const OrganizationProjectCategoryFilterSection = ({
  categories,
  selectedCategoryIds,
  hasNextPage = false,
  isFetchingNextPage = false,
  onToggleCategory,
  onFetchNextPage,
}: OrganizationProjectCategoryFilterSectionProps) => {
  const { t } = useTranslation("organizations");
  const hasCategoryFilter = selectedCategoryIds.length > 0;

  return (
    <OrganizationProjectFiltersSection
      title={t("details.projects.filters.category")}
      isActive={hasCategoryFilter}
      badge={
        hasCategoryFilter
          ? t("details.projects.filters.selected", {
              count: selectedCategoryIds.length,
            })
          : undefined
      }
      className={styles.projectCategories}
    >
      <div className={styles.categoriesInfinite}>
        <div className={styles.categoriesListFilter}>
          <AnimatePresence mode="wait">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={styles.categoryTabWrapper}
              >
                <BaseButtonWrapper
                  type="button"
                  className={`${styles.taskStateButton} ${
                    selectedCategoryIds.includes(category.id)
                      ? styles.taskStateButtonActive
                      : ""
                  }`}
                  onClick={() => onToggleCategory(category.id)}
                >
                  {category.name}
                </BaseButtonWrapper>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasNextPage ? (
          <BaseButtonWrapper
            onClick={onFetchNextPage}
            disabled={isFetchingNextPage}
            className={styles.showMoreButton}
          >
            {isFetchingNextPage
              ? t("details.projects.filters.loading")
              : t("details.projects.filters.showMore")}
          </BaseButtonWrapper>
        ) : null}
      </div>
    </OrganizationProjectFiltersSection>
  );
};
