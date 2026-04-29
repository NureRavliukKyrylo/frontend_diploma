import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { profileKeys } from "@entities/user/profile";
import type { EntityType } from "@shared/config/types";
import { queryKeyMap } from "../config/queryKeyMap";
import { leaveParticipation } from "../api/participationLeaveApi";

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
      if (response?.message) {
        addToast({
          title: `${entityType} Approval Required`,
          description: response.message,
          color: "warning",
        });
      } else {
        addToast({
          title: `Left ${entityType} Successfully`,
          description: `You have left ${entityType} successfully.`,
          color: "success",
        });
      }
      queryClient.invalidateQueries({ queryKey: queryKeyMap[entityType]() });
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
