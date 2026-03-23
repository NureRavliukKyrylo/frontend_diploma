import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import { joinParticipation } from "@shared/api/participation";

export const useJoinProject = () => {
  const mutation = useMutation({
    mutationFn: (entityId: string) =>
      joinParticipation({ entityId, entityType: "project" }),
    onSuccess: () => {
      addToast({
        title: "Joining Project Success",
        description: "You have joined project successfully",
        color: "success",
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      addToast({
        title: "Joining Project Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });
  return {
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    handleJoinProject: (entityId: string) => mutation.mutate(entityId),
    isLoading: mutation.isPending,
  };
};
