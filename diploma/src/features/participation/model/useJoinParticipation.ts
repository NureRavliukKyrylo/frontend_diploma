import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { profileKeys } from "@entities/user/profile";
import type { EntityType } from "@shared/config/types";
import { queryKeyMap } from "../config/queryKeyMap";
import { joinParticipation } from "../api/participationJoinApi";
import { filtersKeys } from "@shared/api/filters";
import { capitalize } from "@shared/libs/text";

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
      if (response?.requiresApproval) {
        addToast({
          title: `${capitalize(entityType)} Approval Required`,
          description: response.message,
          color: "warning",
        });
      } else {
        addToast({
          title: `Joined ${capitalize(entityType)} Successfully`,
          description: `You have joined ${capitalize(entityType)} successfully.`,
          color: "success",
        });
      }
      queryClient.invalidateQueries({
        queryKey: queryKeyMap[entityType].id(entityId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeyMap[entityType].mys(),
      });
      queryClient.invalidateQueries({
        queryKey: filtersKeys.infinite({ entityType }),
      });
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
