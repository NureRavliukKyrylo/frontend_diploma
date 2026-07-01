import { useTranslation } from "react-i18next";
import type {
  ProjectSettingsErrors,
  ProjectSettingsValues,
} from "@features/project";
import { DatePickerInput } from "@shared/ui/inputs";
import { datePickerClassNames, safelyParseDate } from "./datePicker";
import styles from "../GeneralTab.module.scss";

interface TimelineSectionProps {
  values: ProjectSettingsValues;
  errors: ProjectSettingsErrors;
  minimumEndDate: ReturnType<typeof safelyParseDate>;
  onDateChange: (field: "startAt" | "endAt", value: string | null) => void;
}

export const TimelineSection = ({
  values,
  errors,
  minimumEndDate,
  onDateChange,
}: TimelineSectionProps) => {
  const { t } = useTranslation("project");

  return (
    <section className={styles.section}>
    <h2 className={styles.sectionLabel}>{t("settings.general.timeline")}</h2>
    <p className={styles.sectionDescription}>
      {t("settings.general.timelineText")}
    </p>

    <div className={styles.dateRow}>
      <label className={styles.dateField}>
        <span className={styles.fieldLabel}>
          {t("settings.general.startDate")}
        </span>
        <DatePickerInput
          aria-label={t("settings.general.startDate")}
          value={values.startAt}
          onChange={(value) => onDateChange("startAt", value ?? null)}
          classNames={datePickerClassNames}
        />
        {errors.startAt ? <small>{errors.startAt}</small> : null}
      </label>
      <label className={styles.dateField}>
        <span className={styles.fieldLabel}>
          {t("settings.general.endDate")}
        </span>
        <DatePickerInput
          aria-label={t("settings.general.endDate")}
          value={values.endAt}
          minValue={minimumEndDate}
          onChange={(value) => onDateChange("endAt", value ?? null)}
          classNames={datePickerClassNames}
        />
        {errors.endAt ? <small>{errors.endAt}</small> : null}
      </label>
    </div>
    </section>
  );
};
