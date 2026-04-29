import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { profileKeys } from "@entities/user/profile";
import type { EntityType } from "@shared/config/types";
import { queryKeyMap } from "../config/queryKeyMap";
import { joinParticipation } from "../api/participationJoinApi";

interface UseJoinParticipationOptions {
  entityType: Exclude<EntityType, "organization">;
  entityId: string;
  onSuccess?: () => void;
}

export const useJoinParticipation = ({
  entityType,
  entityId,
  onSuccess,
}: UseJoinParticipationOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => joinParticipation({ entityId, entityType }),
    onSuccess: (response) => {
      if (response?.message) {
        addToast({
          title: "Approval Required",
          description: response.message,
          color: "warning",
        });
      } else {
        addToast({
          title: "Joined Successfully",
          description: "You have joined successfully.",
          color: "success",
        });
      }
      queryClient.invalidateQueries({ queryKey: queryKeyMap[entityType]() });
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to Join",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    handleJoin: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
