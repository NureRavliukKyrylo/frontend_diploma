import type { SortOption } from "@shared/config/types";
import { BaseDropDown } from "../base/BaseDropDown";
import styles from "./SortDropDown.module.scss";

interface SortDropDownProps<T extends string> {
  options: SortOption<T>[];
  onSelect: (value: T) => void;
  value: T;
}

export const SortDropDown = <T extends string>({
  options,
  onSelect,
  value,
}: SortDropDownProps<T>) => {
  return (
    <BaseDropDown
      label={
        <span>
          Sort by: <strong>{value}</strong>
        </span>
      }
    >
      <ul className={styles.list}>
        {options.map((option) => (
          <li
            key={option.value}
            className={`${styles.item} ${option.value === value ? styles.itemActive : ""}`}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </BaseDropDown>
  );
};
