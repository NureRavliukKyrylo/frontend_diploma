import type { SkillSortingParams } from "@entities/skill";
import { SortDropDown } from "@shared/ui/drop-down";
import { Search } from "lucide-react";
import type { CategoryFilterValue } from "../model/useAdminSkillsPage";
import { useTranslation } from "react-i18next";

const sortOptions: { value: SkillSortingParams; label: string }[] = [
  { value: "Default", label: "admin:skills.sort.default" },
  { value: "NameAsc", label: "admin:skills.sort.nameAsc" },
  { value: "NameDesc", label: "admin:skills.sort.nameDesc" },
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
}: SkillsToolbarProps) => {
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
          placeholder={t("skills.search")}
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
          options={localizedSortOptions}
          value={sortValue ?? "Default"}
          onSelect={onSortChange}
        />
      </div>
    </div>
  );
};
