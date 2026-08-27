import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryQuery } from "@entities/category";
import { skillsQuery } from "@entities/skill";
import type {
  TaskSettingsChangeHandler,
  TaskSettingsErrors,
  TaskSettingsValues,
} from "@features/task/edit-form";
import type { Coordinates } from "@shared/config/types";
import { BasicInfoSection } from "./general-tab/BasicInfoSection";
import { EffortSection } from "./general-tab/EffortSection";
import { LocationMapModal } from "./general-tab/LocationMapModal";
import { LocationSection } from "./general-tab/LocationSection";
import { PillOptionsSection } from "./general-tab/PillOptionsSection";
import { ReminderSection } from "./general-tab/ReminderSection";
import { safelyParseDateTime } from "./general-tab/dateTimePicker";
import styles from "../TaskEditSettings.module.scss";

interface GeneralTabProps {
  values: TaskSettingsValues;
  errors: TaskSettingsErrors;
  onChange: TaskSettingsChangeHandler;
  onDateChange: (
    field: "startAt" | "endAt" | "reminderAtUtc",
    value: string | null,
  ) => void;
  onCategoryToggle: (categoryId: string) => void;
  onSkillToggle: (skillId: string) => void;
  onLocationChange: (coordinates: Coordinates, label?: string) => void;
  onLocationClear: () => void;
}

export const GeneralTab = ({
  values,
  errors,
  onChange,
  onDateChange,
  onCategoryToggle,
  onSkillToggle,
  onLocationChange,
  onLocationClear,
}: GeneralTabProps) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useQuery(
    categoryQuery.list({ Page: 1, PageSize: 100 }),
  );
  const { data: skillsResponse, isLoading: isSkillsLoading } = useQuery(
    skillsQuery.list({ Page: 1, PageSize: 100 }),
  );
  const categories = categoriesResponse?.data ?? [];
  const skills = useMemo(
    () => skillsResponse?.data ?? [],
    [skillsResponse?.data],
  );
  const minimumEndDate = safelyParseDateTime(values.startAt);

  return (
    <div className={styles.sectionsContainer}>
      <BasicInfoSection
        values={values}
        errors={errors}
        minimumEndDate={minimumEndDate}
        onChange={onChange}
        onDateChange={onDateChange}
      />

      <ReminderSection
        values={values}
        errors={errors}
        onChange={onChange}
        onDateChange={onDateChange}
      />

      <PillOptionsSection
        title="Categories"
        description="Select the topics that make this task discoverable."
        loadingText="Loading categories..."
        isLoading={isCategoriesLoading}
        options={categories}
        selectedIds={values.categoryIds}
        onToggle={onCategoryToggle}
      />

      <PillOptionsSection
        title="Required skills"
        description="Optional skills volunteers should have before joining."
        loadingText="Loading skills..."
        isLoading={isSkillsLoading}
        options={skills}
        selectedIds={values.skillIds}
        onToggle={onSkillToggle}
      />

      <LocationSection
        values={values}
        onMapOpen={() => setIsMapOpen(true)}
        onLocationClear={onLocationClear}
      />

      <EffortSection values={values} errors={errors} onChange={onChange} />

      <LocationMapModal
        isOpen={isMapOpen}
        coordinates={values.location}
        onClose={() => setIsMapOpen(false)}
        onLocationChange={(coordinates) => onLocationChange(coordinates)}
      />
    </div>
  );
};
