import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { profileKeys } from "@entities/user/profile";
import type { EntityType } from "@shared/config/types";
import { queryKeyMap } from "../config/queryKeyMap";
import { leaveParticipation } from "../api/participationLeaveApi";
import { filtersKeys } from "@shared/api/filters";
import { useTranslation } from "react-i18next";
import { queryClient } from "@shared/api";

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
  const { t } = useTranslation("common");

  const mutation = useMutation({
    mutationFn: () => leaveParticipation({ entityId, entityType }),
    onSuccess: (response) => {
      if (response?.requiresApproval) {
        addToast({
          title: t("participation.approvalRequired", {
            entity: t(`participation.entities.${entityType}`),
          }),
          description: response.message,
          color: "warning",
        });
      } else {
        addToast({
          title: t("participation.leaveSuccess", {
            entity: t(`participation.entities.${entityType}`),
          }),
          description: t("participation.leaveSuccessDescription", {
            entity: t(`participation.entities.${entityType}`),
          }),
          color: "success",
        });
      }
      queryClient.invalidateQueries({
        queryKey: queryKeyMap[entityType].id(entityId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeyMap[entityType].mys(),
      });
      const entry = queryKeyMap[entityType];
      if ("calendar" in entry) {
        queryClient.invalidateQueries({ queryKey: entry.calendar() });
      }
      queryClient.invalidateQueries({
        queryKey: filtersKeys.infinite({ entityType }),
      });
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("participation.leaveFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    handleLeave: mutation.mutate,
    resetLeave: mutation.reset,
    isLoading: mutation.isPending,
    error: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
