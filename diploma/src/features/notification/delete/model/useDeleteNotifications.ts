import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
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
  const mutation = useMutation({
    mutationFn: (data: DeleteNotificationsDto) => deleteNotifications(data),
    onSuccess: () => {
      addToast({
        title: "Notifications deleted",
        description: "Selected notifications have been deleted",
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
        title: "Failed to delete",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    deleteNotifications: (ids: string[]) => mutation.mutate({ ids }),
    isLoading: mutation.isPending,
  };
};
