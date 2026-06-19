import { useState } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  createProjectApi,
  type CreateProjectLocation,
  type CreateProjectPayload,
  type ProjectPolicy,
} from "../api/createProjectApi";
import { INITIAL_STATE, toIsoDate } from "./createProjectFormDefaults";

export interface CreateProjectFormState {
  title: string;
  description: string;
  location: CreateProjectLocation | null;
  startAt: string | null;
  endAt: string | null;
  categoryIds: string[];
  joinPolicy: ProjectPolicy;
  leavePolicy: ProjectPolicy;
}

export interface CreateProjectFormErrors {
  title?: string;
  description?: string;
  location?: string;
}

type FormField = Exclude<keyof CreateProjectFormState, "categoryIds" | "location">;

export const useCreateProjectForm = (organizationId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState<CreateProjectFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<CreateProjectFormErrors>({});

  const createMutation = useMutation({
    mutationFn: (payload: CreateProjectPayload) => createProjectApi(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["projects"] }),
        queryClient.invalidateQueries({ queryKey: ["organizations"] }),
      ]);
      await navigate({
        to: "/organizations/$id/projects",
        params: { id: organizationId },
      });
    },
    onError: () => {
      addToast({ title: "Failed to create project", color: "danger" });
    },
  });

  const updateField = <K extends FormField>(
    field: K,
    value: CreateProjectFormState[K],
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (field === "title" || field === "description") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const updateLocation = (location: CreateProjectLocation | null) => {
    setValues((current) => ({ ...current, location }));
    setErrors((current) => ({ ...current, location: undefined }));
  };

  const toggleCategory = (categoryId: string) => {
    setValues((current) => {
      const isSelected = current.categoryIds.includes(categoryId);

      if (isSelected) {
        return {
          ...current,
          categoryIds: current.categoryIds.filter((id) => id !== categoryId),
        };
      }

      if (current.categoryIds.length >= 5) return current;

      return {
        ...current,
        categoryIds: [...current.categoryIds, categoryId],
      };
    });
  };

  const validateBasics = () => {
    const nextErrors: CreateProjectFormErrors = {};

    if (!values.title.trim()) {
      nextErrors.title = "Project title is required";
    }

    if (!values.description.trim()) {
      nextErrors.description = "Project description is required";
    }

    setErrors((current) => ({ ...current, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (activeStep === 0 && !validateBasics()) return;
    setActiveStep((current) => Math.min(current + 1, 3));
  };

  const goBack = () => setActiveStep((current) => Math.max(current - 1, 0));

  const goToStep = (step: number) => {
    if (step < 0 || step > 3) return;
    if (step > 0 && !validateBasics()) {
      setActiveStep(0);
      return;
    }
    setActiveStep(step);
  };

  const submit = () => {
    if (!validateBasics()) {
      setActiveStep(0);
      return;
    }

    if (!values.location) {
      setErrors((current) => ({
        ...current,
        location: "Project location is required",
      }));
      setActiveStep(1);
      return;
    }

    const payload: CreateProjectPayload = {
      Title: values.title.trim(),
      Description: values.description.trim(),
      OrganizationId: organizationId,
      Location: {
        Latitude: values.location.latitude,
        Longitude: values.location.longitude,
        ...(values.location.regionLabel
          ? { RegionLabel: values.location.regionLabel }
          : {}),
      },
      ...(values.startAt ? { StartAt: toIsoDate(values.startAt) } : {}),
      ...(values.endAt ? { EndAt: toIsoDate(values.endAt) } : {}),
      ...(values.categoryIds.length > 0
        ? { CategoryIds: values.categoryIds }
        : {}),
      JoinPolicy: values.joinPolicy,
      LeavePolicy: values.leavePolicy,
    };

    createMutation.mutate(payload);
  };

  return {
    activeStep,
    values,
    errors,
    isSubmitting: createMutation.isPending,
    updateField,
    updateLocation,
    toggleCategory,
    goNext,
    goBack,
    goToStep,
    submit,
  };
};
