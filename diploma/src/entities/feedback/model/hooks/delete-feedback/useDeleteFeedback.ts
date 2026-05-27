import { useMutation } from "@tanstack/react-query";
import { deleteFeedback } from "../../../api";
import { feedbackKeys } from "../../queries";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import type { EntityType } from "@shared/config/types";
import { queryClient } from "@shared/api";
import { feedbackQueryKeyMap } from "../../../config";

interface UseDeleteFeedbackOptions {
  entityType: Exclude<EntityType, "organization">;
  entityId: string;
  onSuccess?: () => void;
}

export const useDeleteFeedback = ({
  entityType,
  entityId,
  onSuccess,
}: UseDeleteFeedbackOptions) => {
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
        title: "Feedback deleted",
        description: "Your feedback has been removed.",
        color: "success",
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to delete feedback",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    handleDeleteFeedback: mutation.mutate,
    mutation,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
