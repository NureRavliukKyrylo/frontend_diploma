import type { SkillsSearchParams } from "@entities/skill/libs";
import { BaseButtonWrapper, ToggleDropdownButton } from "@shared/ui/buttons";
import styles from "./SkillsFilterControls.module.scss";
import { ProjectCategoriesFilter } from "@features/projects";
import { motion } from "framer-motion";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import type { SortOption } from "@shared/config/types";

interface SkillsFilterControlsProps<T extends string> {
  search: SkillsSearchParams;
  onSearchChange: (value: string) => void;
  onSortChange: (value: T) => void;
  onClearFilters: () => void;
  onToggleFilter: () => void;
  sortingItems: SortOption<T>[];
}

export const SkillsFilterControls = <T extends string>({
  search,
  onSearchChange,
  onSortChange,
  onClearFilters,
  onToggleFilter,
  sortingItems,
}: SkillsFilterControlsProps<T>) => {
  return (
    <>
      <ToggleDropdownButton onOpenChange={onToggleFilter}>
        <div className={styles.categoriesFilterBlock}>
          <h1 className={styles.categoriesTitle}>Categories</h1>
          <ProjectCategoriesFilter search={search} from="/skills/" />
        </div>
        <div className={styles.dividerFilterBlock} />
        <div className={styles.buttonClear}>
          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={styles.animationButtonBlock}
          >
            <BaseButtonWrapper
              onClick={onClearFilters}
              className={styles.clearFiltersButton}
            >
              Clear Filters
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </ToggleDropdownButton>

      <SearchBar
        value={search.Search}
        variant="projects"
        onChange={onSearchChange}
      />

      <SortDropDown
        options={sortingItems}
        onSelect={onSortChange}
        value={(search.OrderBy ?? "Default") as T}
      />
    </>
  );
};
