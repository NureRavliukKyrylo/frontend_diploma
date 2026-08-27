import { useMutation } from "@tanstack/react-query";
import { acceptInvitation } from "../api/acceptInvitationApi";
import { useTranslation } from "react-i18next";
import { addToast } from "@heroui/react";
import { queryClient } from "@shared/api";
import { notificationKeys } from "@entities/notification";
import { getErrorMessage } from "@shared/libs/error-message";

export const useAcceptInvitation = (
  requestId: string,
  onSuccess?: () => void,
) => {
  const { t } = useTranslation(["common"]);
  const mutation = useMutation({
    mutationFn: () => acceptInvitation(requestId),
    async onSuccess() {
      addToast({
        title: t("common:requests.toasts.acceptSuccessTitle"),
        description: t("common:requests.toasts.acceptSuccessDesc"),
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
          action: t("common:requests.actions.acceptName"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });
  return { accept: mutation.mutate, isLoading: mutation.isPending };
};
