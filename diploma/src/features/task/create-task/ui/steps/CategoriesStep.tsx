import { useQuery } from "@tanstack/react-query";
import { categoryQuery } from "@entities/category";
import styles from "../CreateTaskDrawer.module.scss";

interface CategoriesStepProps {
  selectedIds: string[];
  onToggle: (categoryId: string) => void;
}

export const CategoriesStep = ({
  selectedIds,
  onToggle,
}: CategoriesStepProps) => {
  const { data, isLoading, isError } = useQuery(
    categoryQuery.list({ Page: 1, PageSize: 100 }),
  );
  const categories = data?.data ?? [];
  const selectionLimitReached = selectedIds.length >= 5;

  return (
    <div className={styles.stepContent}>
      <div className={styles.card}>
        <div className={styles.cardDeco} />
        <section className={styles.fieldBlock}>
          <h2 className={styles.fieldLabel}>Categories</h2>
          <p className={styles.fieldHint}>Select up to 5.</p>

          {isLoading ? (
            <div className={styles.categoryLoading}>Loading categories...</div>
          ) : null}
          {isError ? (
            <div className={styles.categoryError}>
              Unable to load categories.
            </div>
          ) : null}
          {!isLoading && !isError ? (
            <>
              <div className={styles.categoriesGrid}>
                {categories.map((category) => {
                  const selected = selectedIds.includes(category.id);
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
                      onClick={() => onToggle(category.id)}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
              <p className={styles.helperText}>
                {selectedIds.length} of 5 selected
              </p>
            </>
          ) : null}
        </section>
      </div>
    </div>
  );
};
