import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { useTranslation } from "react-i18next";
import { readNotification } from "../api/readNotificationApi";
import { useNotificationStore } from "@entities/notification/model";
import { notificationKeys } from "@entities/notification";

export const useReadNotification = () => {
  const { t } = useTranslation(["notification"]);
  const decrementUnread = useNotificationStore((s) => s.decrementUnread);

  const mutation = useMutation({
    mutationFn: (id: string) => readNotification(id),
    onSuccess: () => {
      addToast({
        title: t("notification:notifications.readSuccessTitle"),
        description: t("notification:notifications.readSuccessDesc"),
        color: "success",
      });
      decrementUnread();
      queryClient.invalidateQueries({ queryKey: notificationKeys.all() });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("notification:notifications.readFailedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    readNotification: (id: string) => mutation.mutate(id),
    isLoading: mutation.isPending,
  };
};
