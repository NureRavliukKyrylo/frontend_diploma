import type { SkillSortingParams } from "@entities/skill";
import { SortDropDown } from "@shared/ui/drop-down";
import { Search } from "lucide-react";
import type { CategoryFilterValue } from "../model/useAdminSkillsPage";

const sortOptions: { value: SkillSortingParams; label: string }[] = [
  { value: "Default", label: "Default order" },
  { value: "NameAsc", label: "Name A-Z" },
  { value: "NameDesc", label: "Name Z-A" },
];

interface SkillsToolbarProps {
  styles: Record<string, string>;
  searchInput: string;
  categoryOptions: Array<{ value: CategoryFilterValue; label: string }>;
  categoryFilterValue: CategoryFilterValue;
  sortValue?: SkillSortingParams;
  onSearchInputChange: (value: string) => void;
  onCategoryChange: (value: CategoryFilterValue) => void;
  onSortChange: (value: SkillSortingParams) => void;
}

export const SkillsToolbar = ({
  styles,
  searchInput,
  categoryOptions,
  categoryFilterValue,
  sortValue,
  onSearchInputChange,
  onCategoryChange,
  onSortChange,
}: SkillsToolbarProps) => (
  <div className={styles.toolbar}>
    <div className={styles.searchBox}>
      <Search size={19} aria-hidden="true" />
      <input
        value={searchInput}
        onChange={(event) => onSearchInputChange(event.target.value)}
        placeholder="Search skills"
      />
    </div>

    <div className={styles.dropdownShell}>
      <SortDropDown
        selectedLabelOnly
        options={categoryOptions}
        value={categoryFilterValue}
        onSelect={onCategoryChange}
      />
    </div>

    <div className={styles.dropdownShell}>
      <SortDropDown
        selectedLabelOnly
        options={sortOptions}
        value={sortValue ?? "Default"}
        onSelect={onSortChange}
      />
    </div>
  </div>
);
