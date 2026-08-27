import type { Dispatch, SetStateAction } from "react";
import type { ProjectSettingsValues } from "./types";

interface UseProjectCategoryHandlersProps {
  setValues: Dispatch<SetStateAction<ProjectSettingsValues | null>>;
}

export const useProjectCategoryHandlers = ({
  setValues,
}: UseProjectCategoryHandlersProps) => {
  const handleCategoryToggle = (categoryId: string) => {
    setValues((current) => {
      if (!current) return current;

      const selected = current.categoryIds.includes(categoryId);

      return {
        ...current,
        categoryIds: selected
          ? current.categoryIds.filter((id) => id !== categoryId)
          : [...current.categoryIds, categoryId],
      };
    });
  };

  return { handleCategoryToggle };
};
