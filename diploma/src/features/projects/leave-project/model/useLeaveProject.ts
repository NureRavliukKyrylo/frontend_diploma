import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { projectKeys } from "@entities/project";
import { profileKeys } from "@entities/user/profile";
import { leaveParticipation } from "@shared/api/participation";

export const useLeaveProject = (onSuccess?: () => void) => {
  const mutation = useMutation({
    mutationFn: (entityId: string) =>
      leaveParticipation({ entityId, entityType: "project" }),
    onSuccess: () => {
      addToast({
        title: "Leaving Project Success",
        description: "You have left project successfully",
        color: "success",
      });
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: projectKeys.mys() });
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Leaving Project Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });
  return {
    mutation,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
    handleLeaveProject: (entityId: string) => mutation.mutate(entityId),
    isLoading: mutation.isPending,
  };
};
