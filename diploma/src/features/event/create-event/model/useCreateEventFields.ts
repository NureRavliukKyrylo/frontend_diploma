import { useState } from "react";
import type {
  CreateEventLocation,
  CreateEventRecurrence,
  CreateEventSkillRequirement,
} from "../api/createEventApi";
import type {
  CreateEventFormErrors,
  CreateEventFormField,
  CreateEventFormState,
} from "./createEventFormTypes";

const INITIAL_STATE: CreateEventFormState = {
  title: "",
  description: "",
  location: null,
  startAt: null,
  endAt: null,
  categoryIds: [],
  requiredSkills: [],
  joinPolicy: "approval_required",
  leavePolicy: "approval_required",
  recurrence: null,
};

const buildDefaultRecurrence = (): CreateEventRecurrence => ({
  enabled: true,
  frequency: "weekly",
  interval: 1,
  until: "",
});

export const useCreateEventFields = () => {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState<CreateEventFormErrors>({});
  const updateField = <K extends CreateEventFormField>(
    field: K,
    value: CreateEventFormState[K],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };
  const updateLocation = (location: CreateEventLocation | null) => {
    setValues((current) => ({ ...current, location }));
    setErrors((current) => ({ ...current, location: undefined }));
  };
  const updateRecurrence = (patch: Partial<CreateEventRecurrence> | null) => {
    setValues((current) => ({
      ...current,
      recurrence:
        patch === null
          ? null
          : { ...(current.recurrence ?? buildDefaultRecurrence()), ...patch },
    }));
    setErrors((current) => ({
      ...current,
      recurrenceFrequency: undefined,
      recurrenceInterval: undefined,
      recurrenceUntil: undefined,
    }));
  };
  const toggleCategory = (categoryId: string) => {
    setValues((current) => {
      const selected = current.categoryIds.includes(categoryId);
      if (selected) {
        return {
          ...current,
          categoryIds: current.categoryIds.filter((id) => id !== categoryId),
        };
      }
      if (current.categoryIds.length >= 5) return current;
      return { ...current, categoryIds: [...current.categoryIds, categoryId] };
    });
  };
  const addSkillRequirement = () => {
    setValues((current) =>
      current.requiredSkills.length >= 10
        ? current
        : {
            ...current,
            requiredSkills: [
              ...current.requiredSkills,
              { skillId: "", expectedHours: 0 },
            ],
          },
    );
  };
  const updateSkillRequirement = (
    index: number,
    patch: Partial<CreateEventSkillRequirement>,
  ) => {
    setValues((current) => ({
      ...current,
      requiredSkills: current.requiredSkills.map((skill, skillIndex) =>
        skillIndex === index ? { ...skill, ...patch } : skill,
      ),
    }));
  };
  const removeSkillRequirement = (index: number) => {
    setValues((current) => ({
      ...current,
      requiredSkills: current.requiredSkills.filter(
        (_skill, skillIndex) => skillIndex !== index,
      ),
    }));
  };

  return {
    values,
    errors,
    setErrors,
    updateField,
    updateLocation,
    updateRecurrence,
    toggleCategory,
    addSkillRequirement,
    updateSkillRequirement,
    removeSkillRequirement,
  };
};
