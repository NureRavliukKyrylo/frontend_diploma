import { useState } from "react";
import type { CreateTaskLocation } from "../api/createTaskApi";
import type {
  CreateTaskFormErrors,
  CreateTaskFormField,
  CreateTaskFormState,
} from "./createTaskFormTypes";

const INITIAL_STATE: CreateTaskFormState = {
  title: "",
  description: "",
  location: null,
  startAt: null,
  endAt: null,
  estimatedMinutes: null,
  points: null,
  categoryIds: [],
  joinPolicy: "open",
  leavePolicy: "approval_required",
};

export const useCreateTaskFields = () => {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState<CreateTaskFormErrors>({});
  const reset = () => {
    setValues(INITIAL_STATE);
    setErrors({});
  };
  const updateField = <K extends CreateTaskFormField>(
    field: K,
    value: CreateTaskFormState[K],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const updateLocation = (location: CreateTaskLocation | null) =>
    setValues((current) => ({ ...current, location }));
  const toggleCategory = (categoryId: string) => {
    setValues((current) => {
      if (current.categoryIds.includes(categoryId)) {
        return {
          ...current,
          categoryIds: current.categoryIds.filter((id) => id !== categoryId),
        };
      }
      if (current.categoryIds.length >= 5) return current;
      return { ...current, categoryIds: [...current.categoryIds, categoryId] };
    });
  };

  return {
    values,
    errors,
    setErrors,
    reset,
    updateField,
    updateLocation,
    toggleCategory,
  };
};
