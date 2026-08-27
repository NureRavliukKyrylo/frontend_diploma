import { parseDateTime } from "@internationalized/date";
import {
  type EventSettingsErrors,
  type EventSettingsLockState,
  type EventSettingsValues,
} from "@features/event";
import { DatePickerInput } from "@shared/ui/inputs";
import { useTranslation } from "react-i18next";
import sectionStyles from "./GeneralTabShared.module.scss";
import styles from "./BasicInfoSection.module.scss";

interface BasicInfoSectionProps {
  values: EventSettingsValues;
  errors: EventSettingsErrors;
  lockState: EventSettingsLockState;
  onChange: <Field extends keyof EventSettingsValues>(
    field: Field,
    value: EventSettingsValues[Field],
  ) => void;
  onDateChange: (field: "startAt" | "endAt", value: string | null) => void;
}

const dateTimePickerClassNames = {
  base: styles.datePickerBase,
  inputWrapper: styles.datePickerInput,
  input: styles.datePickerText,
  segment: styles.datePickerSegment,
  selectorIcon: styles.datePickerIcon,
  calendar: styles.datePickerCalendar,
  popoverContent: styles.dateTimePopover,
};

const safelyParseDateTime = (value: string | null) => {
  if (!value) return undefined;

  try {
    return parseDateTime(value);
  } catch {
    return undefined;
  }
};

export const BasicInfoSection = ({
  values,
  errors,
  lockState,
  onChange,
  onDateChange,
}: BasicInfoSectionProps) => {
  const { t } = useTranslation("event");
  const minimumEndDate = safelyParseDateTime(values.startAt);

  return (
    <section className={sectionStyles.section}>
      <h2 className={sectionStyles.sectionLabel}>
        {t("settings.general.basicInfo")}
      </h2>
      <p className={sectionStyles.sectionDescription}>
        {t("settings.general.basicInfoText")}
      </p>

      <label className={styles.field}>
        <span>{t("settings.general.title")}</span>
        <input
          value={values.title}
          maxLength={200}
          placeholder={t("settings.general.titlePlaceholder")}
          aria-invalid={Boolean(errors.title)}
          onChange={(event) => onChange("title", event.target.value)}
        />
        {errors.title ? <small>{errors.title}</small> : null}
      </label>

      <label className={`${styles.field} ${styles.fullField}`}>
        <span>{t("settings.general.description")}</span>
        <textarea
          value={values.description}
          maxLength={1000}
          placeholder={t("settings.general.descriptionPlaceholder")}
          aria-invalid={Boolean(errors.description)}
          onChange={(event) => onChange("description", event.target.value)}
        />
        <div className={styles.hintRow}>
          {errors.description ? <small>{errors.description}</small> : <i />}
          <em>{values.description.length}/1000</em>
        </div>
      </label>

      <div className={styles.dateRow}>
        <label className={styles.dateField}>
          <span className={sectionStyles.fieldLabel}>
            {t("settings.general.start")}
          </span>
          <DatePickerInput
            aria-label={t("settings.general.start")}
            value={values.startAt}
            granularity="minute"
            hourCycle={24}
            isDisabled={lockState.scheduleAndLocationLocked}
            isInvalid={Boolean(errors.startAt)}
            onChange={(value) => onDateChange("startAt", value ?? null)}
            classNames={dateTimePickerClassNames}
          />
          {errors.startAt ? <small>{errors.startAt}</small> : null}
        </label>
        <label className={styles.dateField}>
          <span className={sectionStyles.fieldLabel}>
            {t("settings.general.end")}
          </span>
          <DatePickerInput
            aria-label={t("settings.general.end")}
            value={values.endAt}
            minValue={minimumEndDate}
            granularity="minute"
            hourCycle={24}
            isDisabled={lockState.scheduleAndLocationLocked}
            isInvalid={Boolean(errors.endAt)}
            onChange={(value) => onDateChange("endAt", value ?? null)}
            classNames={dateTimePickerClassNames}
          />
          {errors.endAt ? <small>{errors.endAt}</small> : null}
        </label>
      </div>

      <label className={`${styles.field} ${styles.fullField}`}>
        <span>{t("settings.general.type")}</span>
        <input
          value={values.type}
          placeholder={t("settings.general.typePlaceholder")}
          disabled={lockState.typeAndSkillsLocked}
          onChange={(event) => onChange("type", event.target.value)}
        />
      </label>
    </section>
  );
};
