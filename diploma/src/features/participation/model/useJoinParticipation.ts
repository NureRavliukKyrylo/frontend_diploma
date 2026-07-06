import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { profileKeys } from "@entities/user/profile";
import type { EntityType } from "@shared/config/types";
import { queryKeyMap } from "../config/queryKeyMap";
import { joinParticipation } from "../api/participationJoinApi";
import { filtersKeys } from "@shared/api/filters";
import { useTranslation } from "react-i18next";
import { queryClient } from "@shared/api";

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
  const { t } = useTranslation("common");

  const mutation = useMutation({
    mutationFn: () => joinParticipation({ entityId, entityType }),
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
          title: t("participation.joinSuccess", {
            entity: t(`participation.entities.${entityType}`),
          }),
          description: t("participation.joinSuccessDescription", {
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
        title: t("participation.joinFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    handleJoin: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};
