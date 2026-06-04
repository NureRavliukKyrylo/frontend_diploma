import type { SortOption } from "@shared/config/types";
import { BaseDropDown } from "../base/BaseDropDown";
import styles from "./FilterDropDown.module.scss";
import { CheckMark } from "@shared/assets/icons/info";

interface FilterDropDownProps<T extends string> {
  options: SortOption<T>[];
  onSelect: (value: T) => void;
  value?: T;
}

export const FilterDropDown = <T extends string>({
  options,
  onSelect,
  value,
}: FilterDropDownProps<T>) => {
  return (
    <BaseDropDown
      className={styles.filterInner}
      buttonClassName={styles.filterButton}
      label={
        <h1 className={styles.dropDownLabel}>
          Filter by
          {value ? `: ${options.find((o) => o.value === value)?.label}` : ""}
        </h1>
      }
    >
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <div className={styles.wrapperItem} key={option.value}>
            <div
              className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
              onClick={() => onSelect(option.value)}
            >
              {option.label}
              {isActive && <img src={CheckMark} alt="check-mark" />}
            </div>
          </div>
        );
      })}
    </BaseDropDown>
  );
};
