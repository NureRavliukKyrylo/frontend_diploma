import type { Dispatch, SetStateAction } from "react";
import type { TaskSettingsValues } from "./types";

interface UseTaskEditSelectionHandlersProps {
  setValues: Dispatch<SetStateAction<TaskSettingsValues>>;
}

export const useTaskEditSelectionHandlers = ({
  setValues,
}: UseTaskEditSelectionHandlersProps) => {
  const handleCategoryToggle = (categoryId: string) => {
    setValues((current) => {
      const selected = current.categoryIds.includes(categoryId);

      return {
        ...current,
        categoryIds: selected
          ? current.categoryIds.filter((id) => id !== categoryId)
          : [...current.categoryIds, categoryId],
      };
    });
  };

  const handleSkillToggle = (skillId: string) => {
    setValues((current) => {
      const selected = current.skillIds.includes(skillId);

      return {
        ...current,
        skillIds: selected
          ? current.skillIds.filter((id) => id !== skillId)
          : [...current.skillIds, skillId],
      };
    });
  };

  return { handleCategoryToggle, handleSkillToggle };
};
