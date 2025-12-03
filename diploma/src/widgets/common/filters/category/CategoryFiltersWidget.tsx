import { Star } from "@shared/assets/icons/info";
import styles from "./CategoryFiltersWidget.module.scss";
import { DatePickerInput } from "@shared/ui/inputs";
import { Slider } from "@heroui/react";
import { useProjectFilters } from "@features/filters/projects/model/useProjectFilters";
import { useProjectFiltersCategoryStore } from "@entities/project/model/store/ProjectFiltersCategoryStore";
import { CategoryTab, type Category } from "@entities/category";

export const CategoryFiltersWidget = () => {
  const categories: Category[] = [
    { categoryName: "Mental Health", categoryBackground: "#E8F5E9" },
    { categoryName: "Education Projects", categoryBackground: "#E3F2FD" },
    { categoryName: "Elder Care", categoryBackground: "#FFF3E0" },
    { categoryName: "Child Support", categoryBackground: "#F3E5F5" },
    { categoryName: "Medical Help", categoryBackground: "#FFEBEE" },
    { categoryName: "Reconstruction", categoryBackground: "#E0F2F1" },
    { categoryName: "Community Growth", categoryBackground: "#FFF9C4" },
    { categoryName: "Environmental Aid", categoryBackground: "#E8F5E9" },
    { categoryName: "Animal Rescue", categoryBackground: "#FFE0B2" },
  ];
  const { filters, resetFilters } = useProjectFilters();

  const setStartDate = useProjectFiltersCategoryStore(
    (state) => state.setStartDate
  );
  const setDueDate = useProjectFiltersCategoryStore(
    (state) => state.setDueDate
  );
  const setRating = useProjectFiltersCategoryStore((state) => state.setRating);
  const toggleCategory = useProjectFiltersCategoryStore(
    (state) => state.toggleCategory
  );

  const hasActiveFilters = !!(
    filters.startDate ||
    filters.dueDate ||
    (filters.rating && filters.rating > 0)
  );

  return (
    <div className={styles.categoryFiltersWidgetBlock}>
      <div className={styles.projectDeadLine}>
        <h1 className={styles.subHeaderFilter}>Project deadline due</h1>
        <div className={styles.deadlineCalendarBlock}>
          <div className={styles.startDate}>
            <h2>Start date</h2>
            <div className={styles.dateStartInput}>
              <DatePickerInput
                label=""
                showMonthAndYearPickers
                name="startDate"
                value={filters.startDate}
                onChange={setStartDate}
              />
            </div>
          </div>
          <div className={styles.dueDate}>
            <h2>Due date</h2>
            <div className={styles.dateDueInput}>
              <DatePickerInput
                label=""
                showMonthAndYearPickers
                name="dueDate"
                value={filters.dueDate}
                onChange={setDueDate}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.dividerFilterBlock} />

      <div className={styles.projectRating}>
        <h1 className={styles.subHeaderFilter}>Project rating</h1>
        <div className={styles.ratingBlock}>
          <div className={styles.valueRating}>
            <img src={Star} alt="star" className={styles.starReview} />
            <h1 className={styles.starReviewValue}>
              {(filters.rating || 0).toFixed(1)}
            </h1>
          </div>
          <Slider
            aria-label="slider"
            size="md"
            minValue={0}
            maxValue={5}
            step={0.1}
            value={filters.rating || 0}
            onChange={(value) => setRating(Number(value))}
          />
        </div>
      </div>

      <div className={styles.dividerFilterBlock} />

      <div className={styles.projectOrganizations}>
        <h1 className={styles.subHeaderFilter}>Organizations</h1>
      </div>
      <div className={styles.projectCategories}>
        <h1 className={styles.subHeaderFilter}>Categories</h1>
        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <CategoryTab
              key={category.categoryName}
              category={category}
              isSelected={filters.categories.includes(category.categoryName)}
              onClick={() => toggleCategory(category.categoryName)}
            />
          ))}
        </div>
      </div>
      <div className={styles.dividerFilterBlock} />

      <div className={styles.projectDistance}>
        <h1 className={styles.subHeaderFilter}>Distance</h1>
      </div>

      <div className={styles.dividerFilterBlock} />

      <div className={styles.moreOptions}>
        <h1 className={styles.subHeaderFilter}>More Options</h1>
      </div>

      <div className={styles.dividerFilterBlock} />

      {hasActiveFilters && (
        <div className={styles.filterActions}>
          <button onClick={resetFilters} className={styles.resetButton}>
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
