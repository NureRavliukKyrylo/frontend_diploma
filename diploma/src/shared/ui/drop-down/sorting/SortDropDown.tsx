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
  selectedLabelOnly?: boolean;
  fitTriggerToWidestOption?: boolean;
}

export const SortDropDown = <T extends string | number>({
  options,
  onSelect,
  value,
  variant = "default",
  label,
  selectedLabelOnly = false,
  fitTriggerToWidestOption = false,
}: SortDropDownProps<T>) => {
  const { t } = useTranslation("common");
  const labelPrefix =
    label ?? (variant === "report" ? t("reason.title") : t("sorting.title"));
  const selectedLabel = options.find((o) => o.value === value)?.label;
  const getTriggerLabel = (optionLabel?: string) =>
    selectedLabelOnly
      ? (optionLabel ?? "")
      : `${labelPrefix}:${optionLabel ?? ""}`;

  return (
    <BaseDropDown
      label={
        <h1
          className={`${styles.dropDownLabel} ${
            fitTriggerToWidestOption ? styles.measuredDropDownLabel : ""
          }`}
        >
          <span className={styles.visibleLabel}>
            {getTriggerLabel(selectedLabel)}
          </span>
          {fitTriggerToWidestOption &&
            options.map((option) => (
              <span
                key={option.value}
                className={styles.widthMeasure}
                aria-hidden="true"
              >
                {getTriggerLabel(option.label)}
              </span>
            ))}
        </h1>
      }
      className={
        fitTriggerToWidestOption ? styles.fitWidestDropDown : undefined
      }
      buttonClassName={
        fitTriggerToWidestOption ? styles.fitWidestButton : undefined
      }
      dropdownClassName={`${variant === "report" ? styles.dropdownReport : ""} ${
        fitTriggerToWidestOption ? styles.fitWidestDropdown : ""
      }`}
    >
      {options.map((option) => {
        const isActive = String(value) === String(option.value);
        return (
          <div key={option.value} className={styles.wrapperItem}>
            <div
              className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
              onClick={() => onSelect(option.value)}
            >
              {option.label}
              {isActive && (
                <img src={CheckMark} alt={t("accessibility.checkMark")} />
              )}
            </div>
          </div>
        );
      })}
    </BaseDropDown>
  );
};
