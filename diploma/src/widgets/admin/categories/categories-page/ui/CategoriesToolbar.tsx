import { SortDropDown } from "@shared/ui/drop-down";
import { Search } from "lucide-react";
import type { CategorySortingParams } from "../model/useAdminCategoriesPage";

const sortOptions: { value: CategorySortingParams; label: string }[] = [
  { value: "Default", label: "Default order" },
  { value: "NameAsc", label: "Name A-Z" },
  { value: "NameDesc", label: "Name Z-A" },
];

interface CategoriesToolbarProps {
  styles: Record<string, string>;
  searchInput: string;
  sortValue?: CategorySortingParams;
  onSearchInputChange: (value: string) => void;
  onSortChange: (value: CategorySortingParams) => void;
}

export const CategoriesToolbar = ({
  styles,
  searchInput,
  sortValue,
  onSearchInputChange,
  onSortChange,
}: CategoriesToolbarProps) => (
  <div className={styles.toolbar}>
    <div className={styles.searchBox}>
      <Search size={19} aria-hidden="true" />
      <input
        value={searchInput}
        onChange={(event) => onSearchInputChange(event.target.value)}
        placeholder="Search categories"
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
