import { categoryQuery, CategoryTab } from "@entities/category";
import styles from "./ProjectFilters.module.scss";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ProjectSearchParams } from "@entities/project";
import { toggleArrayParam } from "../libs/toggleTab";

interface ProjectCategoriesFilterProps {
  search: ProjectSearchParams;
}

export const ProjectCategoriesFilter = ({
  search,
}: ProjectCategoriesFilterProps) => {
  const navigate = useNavigate({ from: "/projects/" });
  const { data: categories } = useQuery(categoryQuery.all());

  const toggleCategory = (categoryId: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        CategoryIds: toggleArrayParam(prev.CategoryIds, categoryId),
      }),
      resetScroll: false,
    });
  };

  return (
    <div className={styles.projectCategories}>
      <h1 className={styles.subHeaderFilter}>Categories</h1>
      <div className={styles.categoriesListFilter}>
        {categories?.data.map((category) => (
          <CategoryTab
            key={category.id}
            name={category.name}
            isSelected={search.CategoryIds?.includes(category.id) ?? false}
            onClick={() => toggleCategory(category.id)}
          />
        ))}
      </div>
    </div>
  );
};
