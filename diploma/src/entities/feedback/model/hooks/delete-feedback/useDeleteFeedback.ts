import { useMutation } from "@tanstack/react-query";
import { deleteFeedback } from "../../../api";
import { feedbackKeys } from "../../queries";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import type { EntityType } from "@shared/config/types";
import { queryClient } from "@shared/api";
import { feedbackQueryKeyMap } from "../../../config";
import { useTranslation } from "react-i18next";

interface UseDeleteFeedbackOptions {
  entityType: EntityType;
  entityId: string;
  onSuccess?: () => void;
}

export const useDeleteFeedback = ({
  entityType,
  entityId,
  onSuccess,
}: UseDeleteFeedbackOptions) => {
  const { t } = useTranslation(["feedback"]);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteFeedback(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedbackKeys.entity(entityType, entityId),
      });
      queryClient.invalidateQueries({
        queryKey: feedbackQueryKeyMap[entityType].id(entityId),
      });
      addToast({
        title: t("feedback:notifications.deleteSuccessTitle"),
        description: t("feedback:notifications.deleteSuccessDescription"),
        color: "success",
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("feedback:notifications.deleteFailedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    handleDeleteFeedback: mutation.mutate,
    mutation,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
