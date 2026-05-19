import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { profileKeys } from "@entities/user/profile";
import type { EntityType } from "@shared/config/types";
import { queryKeyMap } from "../config/queryKeyMap";
import { leaveParticipation } from "../api/participationLeaveApi";
import { filtersKeys } from "@shared/api/filters";
import { capitalize } from "@shared/libs/text";

interface UseLeaveParticipationOptions {
  entityType: Exclude<EntityType, "organization">;
  entityId: string;
  onSuccess?: () => void;
}

export const useLeaveParticipation = ({
  entityType,
  entityId,
  onSuccess,
}: UseLeaveParticipationOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => leaveParticipation({ entityId, entityType }),
    onSuccess: (response) => {
      if (response?.requiresApproval) {
        addToast({
          title: `${capitalize(entityType)} Approval Required`,
          description: response.message,
          color: "warning",
        });
      } else {
        addToast({
          title: `Left ${capitalize(entityType)} Successfully`,
          description: `You have left ${capitalize(entityType)} successfully.`,
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
        title: `Failed to Leave ${entityType}`,
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    handleLeave: mutation.mutate,
    resetLeave: mutation.reset,
    isLoading: mutation.isPending,
    error: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};
