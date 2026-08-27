import styles from "../CreateEventSteps.module.scss";

interface CategoryOption {
  id: string;
  name: string;
}

interface CategoriesBlockProps {
  categories: CategoryOption[];
  categoryIds: string[];
  isLoading: boolean;
  isError: boolean;
  selectionLimitReached: boolean;
  onToggleCategory: (categoryId: string) => void;
}

export const CategoriesBlock = ({
  categories,
  categoryIds,
  isLoading,
  isError,
  selectionLimitReached,
  onToggleCategory,
}: CategoriesBlockProps) => (
  <section className={styles.fieldBlock}>
    <h2 className={styles.blockLabel}>Categories</h2>
    <p className={styles.blockHint}>
      Select up to 5 categories that best describe your event.
    </p>

    {isLoading ? (
      <div className={styles.categoryLoading}>Loading categories...</div>
    ) : null}
    {isError ? (
      <div className={styles.categoryError}>Unable to load categories.</div>
    ) : null}
    {!isLoading && !isError ? (
      <>
        <div className={styles.categoriesGrid}>
          {categories.map((category) => {
            const selected = categoryIds.includes(category.id);
            const disabled = selectionLimitReached && !selected;

            return (
              <button
                key={category.id}
                type="button"
                className={`${styles.categoryChip} ${
                  selected ? styles.categoryChipSelected : ""
                }`}
                disabled={disabled}
                aria-pressed={selected}
                onClick={() => onToggleCategory(category.id)}
              >
                {category.name}
              </button>
            );
          })}
        </div>
        <p className={styles.selectionCount}>
          {selectionLimitReached
            ? "Maximum 5 categories selected"
            : `${categoryIds.length} of 5 selected`}
        </p>
      </>
    ) : null}
  </section>
);
