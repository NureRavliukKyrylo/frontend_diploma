import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@shared/libs/error-message";
import { addToast } from "@heroui/react";
import { joinParticipation } from "@shared/api/participation";
import { projectKeys } from "@entities/project";
import { useRouter } from "@tanstack/react-router";

export const useJoinProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (entityId: string) =>
      joinParticipation({ entityId, entityType: "project" }),
    onSuccess: () => {
      addToast({
        title: "Joining Project Success",
        description: "You have joined project successfully",
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: projectKeys.mys() });
      router.navigate({ to: "/projects/my" });
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
