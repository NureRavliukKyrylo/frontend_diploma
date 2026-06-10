import type { SortOption } from "@shared/config/types";
import { BaseDropDown } from "../base/BaseDropDown";
import styles from "./SortDropDown.module.scss";
import { CheckMark } from "@shared/assets/icons/info";

interface SortDropDownProps<T extends string> {
  options: SortOption<T>[];
  onSelect: (value: T) => void;
  value: T;
  variant?: "default" | "report";
  label?: string;
}

export const SortDropDown = <T extends string>({
  options,
  onSelect,
  value,
  label = "Sort by",
  variant = "default",
}: SortDropDownProps<T>) => {
  return (
    <BaseDropDown
      label={
        <h1 className={styles.dropDownLabel}>
          {label}: {options.find((o) => o.value === value)?.label}
        </h1>
      }
      dropdownClassName={
        variant === "report" ? styles.dropdownReport : undefined
      }
    >
      {options.map((option) => {
        const isActive = value.includes(option.value);
        return (
          <div className={styles.wrapperItem}>
            <div
              key={option.value}
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
