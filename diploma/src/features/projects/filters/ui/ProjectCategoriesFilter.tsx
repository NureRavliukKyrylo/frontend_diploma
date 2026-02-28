import { categoryQuery, CategoryTab } from "@entities/category";
import styles from "./ProjectFilters.module.scss";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

export const ProjectCategoriesFilter = () => {
  const navigate = useNavigate({ from: "/projects/" });
  const search = useSearch({ from: "/_masterLayout/projects/" });
  const { data: categories } = useQuery(categoryQuery.all());

  const toggleCategory = (categoryName: string) => {
    navigate({
      search: (prev) => {
        const current = prev.categories ?? [];
        const updated = current.includes(categoryName)
          ? current.filter((c) => c !== categoryName)
          : [...current, categoryName];
        return { ...prev, categories: updated };
      },
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
            isSelected={search.categories?.includes(category.name) ?? false}
            onClick={toggleCategory}
          />
        ))}
      </div>
    </div>
  );
};
