import {
  type EventSettingsErrors,
  type EventSettingsLockState,
  type EventSettingsSkillRequirement,
  type EventSettingsValues,
} from "@features/event";
import type { Coordinates } from "@shared/config/types";
import { BasicInfoSection } from "./general-tab/BasicInfoSection";
import { CategoriesSection } from "./general-tab/CategoriesSection";
import { LocationSection } from "./general-tab/LocationSection";
import { SkillsSection } from "./general-tab/SkillsSection";
import styles from "./GeneralTab.module.scss";

interface GeneralTabProps {
  values: EventSettingsValues;
  errors: EventSettingsErrors;
  lockState: EventSettingsLockState;
  onChange: <Field extends keyof EventSettingsValues>(
    field: Field,
    value: EventSettingsValues[Field],
  ) => void;
  onDateChange: (field: "startAt" | "endAt", value: string | null) => void;
  onCategoryToggle: (categoryId: string) => void;
  onLocationTextChange: (value: string) => void;
  onLocationChange: (coordinates: Coordinates, label?: string) => void;
  onSkillAdd: () => void;
  onSkillChange: (
    index: number,
    patch: Partial<EventSettingsSkillRequirement>,
  ) => void;
  onSkillRemove: (index: number) => void;
}

export const GeneralTab = ({
  values,
  errors,
  lockState,
  onChange,
  onDateChange,
  onCategoryToggle,
  onLocationTextChange,
  onLocationChange,
  onSkillAdd,
  onSkillChange,
  onSkillRemove,
}: GeneralTabProps) => (
  <div className={styles.sectionsContainer}>
    <BasicInfoSection
      values={values}
      errors={errors}
      lockState={lockState}
      onChange={onChange}
      onDateChange={onDateChange}
    />
    <CategoriesSection values={values} onCategoryToggle={onCategoryToggle} />
    <SkillsSection
      values={values}
      lockState={lockState}
      onSkillAdd={onSkillAdd}
      onSkillChange={onSkillChange}
      onSkillRemove={onSkillRemove}
    />
    <LocationSection
      values={values}
      errors={errors}
      lockState={lockState}
      onLocationTextChange={onLocationTextChange}
      onLocationChange={onLocationChange}
    />
  </div>
);
