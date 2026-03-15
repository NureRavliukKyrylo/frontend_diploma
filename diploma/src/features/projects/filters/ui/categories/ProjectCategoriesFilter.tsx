import { categoryQuery, CategoryTab } from "@entities/category";
import styles from "./ProjectCategoriesFilter.module.scss";
import { useNavigate } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { ProjectSearchParams } from "@entities/project";
import { toggleArrayParam } from "../../libs/toggleTab";
import type { NavigateParams } from "../../model/NavigateParams";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectCategoriesFilterProps {
  search: ProjectSearchParams;
  from: Exclude<NavigateParams, "/categories/$id/">;
}

export const ProjectCategoriesFilter = ({
  search,
  from,
}: ProjectCategoriesFilterProps) => {
  const navigate = useNavigate({ from });
  const {
    data: categories = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(categoryQuery.infinite({ PageSize: 7 }));

  const toggleCategory = (categoryId: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        CategoryIds: toggleArrayParam(prev.CategoryIds, categoryId),
        Page: 1,
      }),
      resetScroll: false,
    });
  };

  return (
    <div className={styles.categoriesInfinite}>
      <div className={styles.categoriesListFilter}>
        <AnimatePresence mode="wait">
          {categories?.map((category, index) => (
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
                isSelected={search.CategoryIds?.includes(category.id) ?? false}
                onClick={() => toggleCategory(category.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {hasNextPage && (
        <BaseButtonWrapper
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={styles.showMoreCategoriesButton}
        >
          {isFetchingNextPage ? "Loading..." : "show more"}
        </BaseButtonWrapper>
      )}
    </div>
  );
};
