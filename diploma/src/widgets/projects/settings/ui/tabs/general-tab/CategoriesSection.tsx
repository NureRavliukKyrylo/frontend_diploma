import { useTranslation } from "react-i18next";
import styles from "../GeneralTab.module.scss";

interface CategoryOption {
  id: string;
  name: string;
}

interface CategoriesSectionProps {
  categories: CategoryOption[];
  selectedIds: string[];
  isLoading: boolean;
  onCategoryToggle: (categoryId: string) => void;
}

export const CategoriesSection = ({
  categories,
  selectedIds,
  isLoading,
  onCategoryToggle,
}: CategoriesSectionProps) => {
  const { t } = useTranslation("project");

  return (
    <section className={styles.section}>
    <h2 className={styles.sectionLabel}>{t("settings.general.categories")}</h2>
    <p className={styles.sectionDescription}>
      {t("settings.general.categoriesText")}
    </p>

    {isLoading ? (
      <div className={styles.categoryState}>
        {t("settings.general.loadingCategories")}
      </div>
    ) : (
      <div className={styles.categoryGrid}>
        {categories.map((category) => {
          const selected = selectedIds.includes(category.id);

          return (
            <button
              key={category.id}
              type="button"
              className={`${styles.categoryPill} ${selected ? styles.active : ""}`}
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
