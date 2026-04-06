import { useMutation } from "@tanstack/react-query";
import { createFeedback, type CreateFeedbackDto } from "../../../api";
import { feedbackKeys } from "../../queries";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import type { EntityType } from "@shared/config/types";
import { queryClient } from "@shared/api";

interface UseCreateFeedbackOptions {
  entityType: EntityType;
  entityId: string;
  onSuccess?: () => void;
}

export const useCreateFeedback = ({
  entityType,
  entityId,
  onSuccess,
}: UseCreateFeedbackOptions) => {
  const mutation = useMutation({
    mutationFn: (data: Omit<CreateFeedbackDto, "entityType" | "entityId">) =>
      createFeedback({ ...data, entityType, entityId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: feedbackKeys.entity(entityType, entityId),
      });
      addToast({
        title: "Feedback submitted",
        description: "Thank you for your feedback!",
        color: "success",
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to submit feedback",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    handleCreateFeedback: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
