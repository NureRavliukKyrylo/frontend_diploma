import { CategoryTab, type Category } from "@entities/category";
import styles from "./ProjectFilters.module.scss";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const ProjectCategoriesFilter = () => {
  type PickCategory = Pick<Category, "id" | "name">;
  const categories: PickCategory[] = [
    { id: "69865869444e0ab357536012", name: "Mental Health" },
    { id: "69865869444e0ab357536012", name: "Education Projects" },
    { id: "69865869444e0ab357536012", name: "Elder Care" },
    { id: "69865869444e0ab357536012", name: "Child Support" },
    { id: "69865869444e0ab357536012", name: "Medical Help" },
    { id: "69865869444e0ab357536012", name: "Reconstruction" },
    { id: "69865869444e0ab357536012", name: "Community Growth" },
    { id: "69865869444e0ab357536012", name: "Environmental Aid" },
    { id: "69865869444e0ab357536012", name: "Animal Rescue" },
  ];

  const navigate = useNavigate({ from: "/projects/" });
  const search = useSearch({ from: "/_masterLayout/projects/" });

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
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <CategoryTab
            key={category.id}
            categoryName={category.name}
            isSelected={search.categories?.includes(category.name) ?? false}
            onClick={toggleCategory}
          />
        ))}
      </div>
    </div>
  );
};
