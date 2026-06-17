import { useMutation } from "@tanstack/react-query";
import { updateFeedback, type UpdateFeedbackDto } from "../../../api";
import { feedbackKeys } from "../../queries";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import type { EntityType } from "@shared/config/types";
import { queryClient } from "@shared/api";
import { feedbackQueryKeyMap } from "../../../config";
import { useTranslation } from "react-i18next";

interface UseUpdateFeedbackOptions {
  entityType: Exclude<EntityType, "organization">;
  entityId: string;
  onSuccess?: () => void;
}

export const useUpdateFeedback = ({
  entityType,
  entityId,
  onSuccess,
}: UseUpdateFeedbackOptions) => {
  const { t } = useTranslation(["feedback"]);

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFeedbackDto }) =>
      updateFeedback(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedbackKeys.entity(entityType, entityId),
      });
      queryClient.invalidateQueries({
        queryKey: feedbackQueryKeyMap[entityType].id(entityId),
      });
      addToast({
        title: t("feedback:notifications.updateSuccessTitle"),
        description: t("feedback:notifications.updateSuccessDescription"),
        color: "success",
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("feedback:notifications.updateFailedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    handleUpdateFeedback: mutation.mutate,
    mutation,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
