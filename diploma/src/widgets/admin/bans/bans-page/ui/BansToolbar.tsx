import { SortDropDown } from "@shared/ui/drop-down";
import { SearchBar } from "@shared/ui/inputs";
import { durationOptions, sortOptions } from "../../config/options";
import type {
  AdminBansStyles,
  DurationFilter,
  SortValue,
} from "../../model/types";
import { useTranslation } from "react-i18next";

interface BansToolbarProps {
  styles: AdminBansStyles;
  search: string;
  duration: DurationFilter;
  sort: SortValue;
  onSearchChange: (value: string) => void;
  onDurationChange: (value: DurationFilter) => void;
  onSortChange: (value: SortValue) => void;
}

export const BansToolbar = ({
  styles,
  search,
  duration,
  sort,
  onSearchChange,
  onDurationChange,
  onSortChange,
}: BansToolbarProps) => {
  const { t } = useTranslation("admin");
  const localizedDurationOptions = durationOptions.map((option) => ({
    ...option,
    label: t(option.label),
  }));
  const localizedSortOptions = sortOptions.map((option) => ({
    ...option,
    label: t(option.label),
  }));

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchShell}>
        <SearchBar value={search} onChange={onSearchChange} debounce={250} />
      </div>

      <div className={styles.filters}>
        <label className={styles.filterField}>
          <span>{t("bans.filters.duration")}</span>
          <div className={styles.dropdownShell}>
            <SortDropDown
              selectedLabelOnly
              options={localizedDurationOptions}
              value={duration}
              onSelect={onDurationChange}
            />
          </div>
        </label>
        <label className={styles.filterField}>
          <span>{t("bans.filters.sort")}</span>
          <div className={styles.dropdownShell}>
            <SortDropDown
              selectedLabelOnly
              options={localizedSortOptions}
              value={sort}
              onSelect={onSortChange}
            />
          </div>
        </label>
      </div>
    </div>
  );
};
