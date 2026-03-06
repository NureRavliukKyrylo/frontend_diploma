import { categoryQuery, CategoryTab } from "@entities/category";
import styles from "./ProjectCategoriesFilter.module.scss";
import { useNavigate } from "@tanstack/react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { ProjectSearchParams } from "@entities/project";
import { toggleArrayParam } from "../../libs/toggleTab";
import type { NavigateParams } from "../../model/NavigateParams";
import { BaseButtonWrapper } from "@shared/ui/buttons";

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
  } = useInfiniteQuery(categoryQuery.infinite({ pageSize: 5 }));

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
        {categories?.map((category) => (
          <CategoryTab
            key={category.id}
            name={category.name}
            isSelected={search.CategoryIds?.includes(category.id) ?? false}
            onClick={() => toggleCategory(category.id)}
          />
        ))}
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
