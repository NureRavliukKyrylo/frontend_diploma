import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { eventKeys } from "@entities/event";
import { organizationKeys } from "@entities/organization";
import { createEventApi, type CreateEventPayload } from "../api/createEventApi";
import { buildCreateEventPayload } from "../lib/createEventPayload";
import { useCreateEventFields } from "./useCreateEventFields";
import { useCreateEventSteps } from "./useCreateEventSteps";

export type {
  CreateEventFormErrors,
  CreateEventFormState,
} from "./createEventFormTypes";

export const useCreateEventForm = (
  organizationId: string,
  projectId?: string,
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fields = useCreateEventFields();
  const steps = useCreateEventSteps({
    values: fields.values,
    setErrors: fields.setErrors,
  });
  const createMutation = useMutation({
    mutationFn: (payload: CreateEventPayload) => createEventApi(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: eventKeys.all() }),
        queryClient.invalidateQueries({ queryKey: organizationKeys.all() }),
      ]);
      await navigate({
        to: "/organizations/$id/events",
        params: { id: organizationId },
      });
    },
    onError: () =>
      addToast({ title: "Failed to create event", color: "danger" }),
  });
  const submit = () => {
    if (!steps.validateStep(0)) {
      steps.setActiveStep(0);
      return;
    }
    if (!steps.validateStep(1)) {
      steps.setActiveStep(1);
      return;
    }
    if (!steps.validateStep(2)) {
      steps.setActiveStep(2);
      return;
    }
    if (!fields.values.location) {
      fields.setErrors((current) => ({
        ...current,
        location: "Event location is required",
      }));
      steps.setActiveStep(1);
      return;
    }
    createMutation.mutate(
      buildCreateEventPayload(organizationId, projectId, fields.values),
    );
  };

  return {
    activeStep: steps.activeStep,
    values: fields.values,
    errors: fields.errors,
    isSubmitting: createMutation.isPending,
    updateField: fields.updateField,
    updateLocation: fields.updateLocation,
    updateRecurrence: fields.updateRecurrence,
    toggleCategory: fields.toggleCategory,
    addSkillRequirement: fields.addSkillRequirement,
    updateSkillRequirement: fields.updateSkillRequirement,
    removeSkillRequirement: fields.removeSkillRequirement,
    goNext: steps.goNext,
    goBack: steps.goBack,
    goToStep: steps.goToStep,
    submit,
  };
};
