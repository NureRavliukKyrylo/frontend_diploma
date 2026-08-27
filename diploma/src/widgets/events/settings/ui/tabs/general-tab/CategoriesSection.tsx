import { useQuery } from "@tanstack/react-query";
import { categoryQuery } from "@entities/category";
import { type EventSettingsValues } from "@features/event";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("event");
  const { data: categoriesResponse, isLoading: categoriesLoading } = useQuery(
    categoryQuery.list({ Page: 1, PageSize: 100 }),
  );
  const categories = categoriesResponse?.data ?? [];

  return (
    <section className={sectionStyles.section}>
      <h2 className={sectionStyles.sectionLabel}>
        {t("settings.general.categories")}
      </h2>
      <p className={sectionStyles.sectionDescription}>
        {t("settings.general.categoriesText")}
      </p>

      {categoriesLoading ? (
        <div className={styles.categoryState}>
          {t("settings.general.loadingCategories")}
        </div>
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
