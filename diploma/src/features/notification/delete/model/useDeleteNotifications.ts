import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { useTranslation } from "react-i18next";
import {
  deleteNotifications,
  type DeleteNotificationsDto,
} from "../api/deleteNotifcationsApi";
import { notificationKeys } from "@entities/notification";

interface UseDeleteNotificationsProps {
  onSuccess?: () => void;
}

export const useDeleteNotifications = ({
  onSuccess,
}: UseDeleteNotificationsProps = {}) => {
  const { t } = useTranslation(["notification"]);

  const mutation = useMutation({
    mutationFn: (data: DeleteNotificationsDto) => deleteNotifications(data),
    onSuccess: () => {
      addToast({
        title: t("notification:notifications.deleteSuccessTitle"),
        description: t("notification:notifications.deleteSuccessDesc"),
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: notificationKeys.all() });
      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount(),
      });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("notification:notifications.deleteFailedTitle"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    deleteNotifications: (ids: string[]) => mutation.mutate({ ids }),
    isLoading: mutation.isPending,
  };
};
