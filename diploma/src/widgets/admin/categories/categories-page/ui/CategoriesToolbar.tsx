import { SortDropDown } from "@shared/ui/drop-down";
import { Search } from "lucide-react";
import type { CategorySortingParams } from "../model/useAdminCategoriesPage";
import { useTranslation } from "react-i18next";

const sortOptions: { value: CategorySortingParams; label: string }[] = [
  { value: "Default", label: "admin:categories.sort.default" },
  { value: "NameAsc", label: "admin:categories.sort.nameAsc" },
  { value: "NameDesc", label: "admin:categories.sort.nameDesc" },
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
}: CategoriesToolbarProps) => {
  const { t } = useTranslation("admin");
  const localizedSortOptions = sortOptions.map((option) => ({
    ...option,
    label: t(option.label),
  }));

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchBox}>
        <Search size={19} aria-hidden="true" />
        <input
          value={searchInput}
          onChange={(event) => onSearchInputChange(event.target.value)}
          placeholder={t("categories.search")}
        />
      </div>

      <div className={styles.dropdownShell}>
        <SortDropDown
          selectedLabelOnly
          options={localizedSortOptions}
          value={sortValue ?? "Default"}
          onSelect={onSortChange}
        />
      </div>
    </div>
  );
};
