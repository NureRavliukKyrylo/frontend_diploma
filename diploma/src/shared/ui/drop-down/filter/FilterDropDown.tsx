import type { SortOption } from "@shared/config/types";
import { BaseDropDown } from "../base/BaseDropDown";
import styles from "./FilterDropDown.module.scss";
import { CheckMark } from "@shared/assets/icons/info";
import { useTranslation } from "react-i18next";
interface FilterDropDownProps<T extends string> {
  options: SortOption<T>[];
  onSelect: (value: T) => void;
  value?: T;
  variant?: "default" | "absolute";
}

export const FilterDropDown = <T extends string>({
  options,
  onSelect,
  value,
  variant = "default",
}: FilterDropDownProps<T>) => {
  const { t } = useTranslation("common");
  return (
    <BaseDropDown
      className={`${styles.filterInner} ${variant === "absolute" ? styles.filterInnerAbsolute : ""}`}
      buttonClassName={styles.filterButton}
      dropdownClassName={`${styles.filterDropdown} ${variant === "absolute" ? styles.filterDropdownAbsolute : ""}`}
      label={
        <h1 className={styles.dropDownLabel}>
          {t("filters.filterByTitle")}
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
