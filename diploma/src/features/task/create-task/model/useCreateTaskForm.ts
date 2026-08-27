import { addToast } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationKeys } from "@entities/organization";
import { taskKeys } from "@entities/task";
import { createTaskApi, type CreateTaskPayload } from "../api/createTaskApi";
import { buildCreateTaskPayload } from "../lib/createTaskPayload";
import { useCreateTaskFields } from "./useCreateTaskFields";
import { useCreateTaskSteps } from "./useCreateTaskSteps";
import { useTranslation } from "react-i18next";

export type {
  CreateTaskFormErrors,
  CreateTaskFormState,
} from "./createTaskFormTypes";

interface UseCreateTaskFormOptions {
  organizationId: string;
  projectId?: string;
  eventId?: string;
  onSuccess: () => void;
}

export const useCreateTaskForm = ({
  organizationId,
  projectId,
  eventId,
  onSuccess,
}: UseCreateTaskFormOptions) => {
  const { t } = useTranslation("task");
  const queryClient = useQueryClient();
  const fields = useCreateTaskFields();
  const steps = useCreateTaskSteps({
    values: fields.values,
    setErrors: fields.setErrors,
  });
  const reset = () => {
    steps.setActiveStep(0);
    fields.reset();
  };
  const createMutation = useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTaskApi(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          predicate: (query) => {
            const key = query.queryKey as unknown[];
            if (key[0] !== taskKeys.all()[0] || key[1] !== "list") return false;
            const params = key[2] as { OrganizationIds?: string[] } | undefined;
            return params?.OrganizationIds?.includes(organizationId) ?? false;
          },
        }),
        queryClient.invalidateQueries({ queryKey: organizationKeys.all() }),
      ]);
      addToast({ title: t("create.created"), color: "success" });
      reset();
      onSuccess();
    },
    onError: () => addToast({ title: t("create.failed"), color: "danger" }),
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
    createMutation.mutate(
      buildCreateTaskPayload(
        organizationId,
        projectId,
        eventId,
        fields.values,
        t,
      ),
    );
  };

  return {
    activeStep: steps.activeStep,
    values: fields.values,
    errors: fields.errors,
    isSubmitting: createMutation.isPending,
    updateField: fields.updateField,
    updateLocation: fields.updateLocation,
    toggleCategory: fields.toggleCategory,
    goNext: steps.goNext,
    goBack: steps.goBack,
    goToStep: steps.goToStep,
    submit,
    reset,
  };
};
