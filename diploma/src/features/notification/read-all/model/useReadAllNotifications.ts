import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { useTranslation } from "react-i18next";
import { readAllNotifications } from "../api/readAllNotificationsApi";
import { notificationKeys, useNotificationStore } from "@entities/notification";

export const useReadAllNotifications = () => {
  const { t } = useTranslation(["notification"]);
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);

  const mutation = useMutation({
    mutationFn: () => readAllNotifications(),
    onSuccess: () => {
      addToast({
        title: t("notification:notifications.readAllSuccessTitle"),
        description: t("notification:notifications.readAllSuccessDesc"),
        color: "success",
      });

      setUnreadCount(0);
      queryClient.invalidateQueries({ queryKey: notificationKeys.all() });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("notification:notifications.readAllFailedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    readAllNotifications: () => mutation.mutate(),
    isLoading: mutation.isPending,
  };
};
