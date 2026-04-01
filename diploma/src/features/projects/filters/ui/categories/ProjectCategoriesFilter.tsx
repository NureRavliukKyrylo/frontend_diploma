import { CategoryTab, type Category } from "@entities/category";
import styles from "./ProjectCategoriesFilter.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import type { QueryResult } from "@shared/config/types";

interface ProjectCategoriesFilterProps {
  useCategoriesQuery: () => QueryResult<Pick<Category, "id" | "name">>;
  selectedIds?: string[];
  onToggle: (id: string) => void;
}

export const ProjectCategoriesFilter = ({
  useCategoriesQuery,
  selectedIds,
  onToggle,
}: ProjectCategoriesFilterProps) => {
  const {
    data: categories = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useCategoriesQuery();

  if (isError) {
    return (
      <div className={styles.stateMessage}>
        <p className={styles.errorMessage}>Failed to load organizations</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return <p className={styles.emptyText}>No categories found</p>;
  }

  return (
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
              <CategoryTab
                name={category.name}
                isSelected={selectedIds?.includes(category.id) ?? false}
                onClick={() => onToggle(category.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {hasNextPage && (
        <BaseButtonWrapper
          onClick={() => fetchNextPage?.()}
          disabled={isFetchingNextPage}
          className={styles.showMoreCategoriesButton}
        >
          {isFetchingNextPage ? "Loading..." : "show more"}
        </BaseButtonWrapper>
      )}
    </div>
  );
};
