import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { readNotification } from "../api/readNotificationApi";
import { useNotificationStore } from "@entities/notification/model";
import { notificationKeys } from "@entities/notification";

export const useReadNotification = () => {
  const decrementUnread = useNotificationStore((s) => s.decrementUnread);

  const mutation = useMutation({
    mutationFn: (id: string) => readNotification(id),
    onSuccess: () => {
      decrementUnread();
      queryClient.invalidateQueries({ queryKey: notificationKeys.all() });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Notification marked as read",
        description: "The notification has been marked as read",
        color: "success",
      });

      addToast({
        title: "Failed to mark as read",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    readNotification: (id: string) => mutation.mutate(id),
    isLoading: mutation.isPending,
  };
};
