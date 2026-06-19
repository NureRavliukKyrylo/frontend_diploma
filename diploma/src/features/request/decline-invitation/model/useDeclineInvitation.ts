import { useMutation } from "@tanstack/react-query";
import { declineInvitation } from "../api/declineInvitationApi";
import { useTranslation } from "react-i18next";
import { addToast } from "@heroui/react";
import { queryClient } from "@shared/api";
import { notificationKeys } from "@entities/notification";
import { getErrorMessage } from "@shared/libs/error-message";

export const useDeclineInvitation = (
  requestId: string,
  onSuccess?: () => void,
) => {
  const { t } = useTranslation(["common"]);
  const mutation = useMutation({
    mutationFn: () => declineInvitation(requestId),
    async onSuccess() {
      addToast({
        title: t("common:requests.toasts.declineSuccessTitle"),
        description: t("common:requests.toasts.declineSuccessDesc"),
        color: "success",
      });
      try {
        await onSuccess?.();
      } catch {}
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all(),
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("common:requests.actions.declineName"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });
  return { decline: mutation.mutate, isLoading: mutation.isPending };
};
