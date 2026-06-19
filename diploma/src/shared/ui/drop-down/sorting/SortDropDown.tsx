import type { SortOption } from "@shared/config/types";
import { BaseDropDown } from "../base/BaseDropDown";
import styles from "./SortDropDown.module.scss";
import { CheckMark } from "@shared/assets/icons/info";
import { useTranslation } from "react-i18next";

interface SortDropDownProps<T extends string | number> {
  options: SortOption<T>[];
  onSelect: (value: T) => void;
  value: T;
  variant?: "default" | "report";
  label?: string;
}

export const SortDropDown = <T extends string | number>({
  options,
  onSelect,
  value,
  variant = "default",
  label,
}: SortDropDownProps<T>) => {
  const { t } = useTranslation("common");
  return (
    <BaseDropDown
      label={
        <h1 className={styles.dropDownLabel}>
          {label ?? (variant === "report" ? t("reason.title") : t("sorting.title"))}:
          {options.find((o) => o.value === value)?.label}
        </h1>
      }
      dropdownClassName={
        variant === "report" ? styles.dropdownReport : undefined
      }
    >
      {options.map((option) => {
        const isActive = String(value).includes(String(option.value));
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
