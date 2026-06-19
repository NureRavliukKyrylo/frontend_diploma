import { useQuery } from "@tanstack/react-query";
import { categoryQuery } from "@entities/category";
import { type EventSettingsValues } from "@features/event";
import sectionStyles from "./GeneralTabShared.module.scss";
import styles from "./CategoriesSection.module.scss";

interface CategoriesSectionProps {
  values: EventSettingsValues;
  onCategoryToggle: (categoryId: string) => void;
}

export const CategoriesSection = ({
  values,
  onCategoryToggle,
}: CategoriesSectionProps) => {
  const { data: categoriesResponse, isLoading: categoriesLoading } = useQuery(
    categoryQuery.list({ Page: 1, PageSize: 100 }),
  );
  const categories = categoriesResponse?.data ?? [];

  return (
    <section className={sectionStyles.section}>
      <h2 className={sectionStyles.sectionLabel}>Categories</h2>
      <p className={sectionStyles.sectionDescription}>
        Choose the topics that best describe this event.
      </p>

      {categoriesLoading ? (
        <div className={styles.categoryState}>Loading categories...</div>
      ) : (
        <div className={styles.categoryGrid}>
          {categories.map((category) => {
            const selected = values.categoryIds.includes(category.id);

            return (
              <button
                key={category.id}
                type="button"
                className={`${styles.categoryPill} ${
                  selected ? styles.active : ""
                }`}
                onClick={() => onCategoryToggle(category.id)}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};
