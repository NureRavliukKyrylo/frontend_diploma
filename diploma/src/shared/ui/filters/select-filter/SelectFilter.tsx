import { FilterDropDown } from "@shared/ui/drop-down";
import styles from "./SelectFilter.module.scss";
import type { SortOption } from "@shared/config/types";

interface SelectFilterProps<T extends string> {
  label: string;
  options: SortOption<T>[];
  value: T | undefined;
  onChange: (value: T) => void;
  hideLabel?: boolean;
  variant?: "default" | "absolute";
}

export const SelectFilter = <T extends string>({
  label,
  options,
  value,
  onChange,
  hideLabel = false,
  variant,
}: SelectFilterProps<T>) => {
  return (
    <div
      className={`${styles.selectFilter} ${hideLabel ? styles.noLabel : ""}`}
    >
      {!hideLabel && <h1 className={styles.titleSelectFilter}>{label}</h1>}
      <FilterDropDown
        options={options}
        value={value}
        onSelect={onChange}
        variant={variant}
      />
    </div>
  );
};
