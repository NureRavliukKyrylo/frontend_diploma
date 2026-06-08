import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { readAllNotifications } from "../api/readAllNotificationsApi";
import { notificationKeys, useNotificationStore } from "@entities/notification";

export const useReadAllNotifications = () => {
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);

  const mutation = useMutation({
    mutationFn: () => readAllNotifications(),
    onSuccess: () => {
      addToast({
        title: "All notifications marked as read",
        description: "All notifications have been marked as read",
        color: "success",
      });

      setUnreadCount(0);
      queryClient.invalidateQueries({ queryKey: notificationKeys.all() });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to mark all as read",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    readAllNotifications: () => mutation.mutate(),
    isLoading: mutation.isPending,
  };
};
