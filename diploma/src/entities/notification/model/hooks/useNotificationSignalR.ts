import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "../store/useNotificationStore";
import { useSignalREvent } from "@shared/libs/hooks";
import type { Notification } from "../types/Notification";
import { notificationKeys } from "../queries/notificationQuery";
import { chatKeys } from "@entities/chat";

const chatRelevantNotificationTypes = new Set<Notification["type"]>([
  "JoinRequestApproved",
  "LeaveRequestApproved",
  "InvitationAccepted",
]);

export function useNotificationSignalR() {
  const addNotification = useNotificationStore((s) => s.addNotification);
  const queryClient = useQueryClient();

  useSignalREvent(
    "notifications",
    "notification.created",
    useCallback(
      (notification: Notification) => {
        addNotification(notification);
        queryClient.invalidateQueries({ queryKey: notificationKeys.all() });
        if (chatRelevantNotificationTypes.has(notification.type)) {
          queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
        }
      },
      [addNotification, queryClient],
    ),
  );
}
