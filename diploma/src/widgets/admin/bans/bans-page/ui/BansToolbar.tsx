import { SortDropDown } from "@shared/ui/drop-down";
import { SearchBar } from "@shared/ui/inputs";
import { durationOptions, sortOptions } from "../../config/options";
import type {
  AdminBansStyles,
  DurationFilter,
  SortValue,
} from "../../model/types";

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
}: BansToolbarProps) => (
  <div className={styles.toolbar}>
    <div className={styles.searchShell}>
      <SearchBar value={search} onChange={onSearchChange} debounce={250} />
    </div>

    <div className={styles.filters}>
      <label className={styles.filterField}>
        <span>Duration</span>
        <div className={styles.dropdownShell}>
          <SortDropDown
            selectedLabelOnly
            options={durationOptions}
            value={duration}
            onSelect={onDurationChange}
          />
        </div>
      </label>
      <label className={styles.filterField}>
        <span>Sort</span>
        <div className={styles.dropdownShell}>
          <SortDropDown
            selectedLabelOnly
            options={sortOptions}
            value={sort}
            onSelect={onSortChange}
          />
        </div>
      </label>
    </div>
  </div>
);
