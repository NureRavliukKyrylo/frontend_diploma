import { useMutation } from "@tanstack/react-query";
import { updateFeedback, type UpdateFeedbackDto } from "../../../api";
import { feedbackKeys } from "../../queries";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import type { EntityType } from "@shared/config/types";
import { queryClient } from "@shared/api";

interface UseUpdateFeedbackOptions {
  entityType: EntityType;
  entityId: string;
  onSuccess?: () => void;
}

export const useUpdateFeedback = ({
  entityType,
  entityId,
  onSuccess,
}: UseUpdateFeedbackOptions) => {
  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFeedbackDto }) =>
      updateFeedback(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedbackKeys.entity(entityType, entityId),
      });
      addToast({
        title: "Feedback updated",
        description: "Your feedback has been updated.",
        color: "success",
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to update feedback",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    handleUpdateFeedback: mutation.mutate,
    mutation,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
