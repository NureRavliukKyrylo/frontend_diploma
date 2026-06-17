import { useMutation } from "@tanstack/react-query";
import { createFeedback, type CreateFeedbackDto } from "../../../api";
import { feedbackKeys } from "../../queries";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import type { EntityType } from "@shared/config/types";
import { queryClient } from "@shared/api";
import { feedbackQueryKeyMap } from "../../../config";
import { useTranslation } from "react-i18next";

interface UseCreateFeedbackOptions {
  entityType: Exclude<EntityType, "organization">;
  entityId: string;
  onSuccess?: () => void;
}

export const useCreateFeedback = ({
  entityType,
  entityId,
  onSuccess,
}: UseCreateFeedbackOptions) => {
  const { t } = useTranslation(["feedback"]);

  const mutation = useMutation({
    mutationFn: (data: Omit<CreateFeedbackDto, "entityType" | "entityId">) =>
      createFeedback({ ...data, entityType, entityId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedbackKeys.entity(entityType, entityId),
      });
      queryClient.invalidateQueries({
        queryKey: feedbackQueryKeyMap[entityType].id(entityId),
      });
      addToast({
        title: t("feedback:notifications.createSuccessTitle"),
        description: t("feedback:notifications.createSuccessDescription"),
        color: "success",
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("feedback:notifications.createFailedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    handleCreateFeedback: mutation.mutate,
    mutation,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
