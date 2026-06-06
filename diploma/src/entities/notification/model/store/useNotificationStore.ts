import { create } from "zustand";
import type { Notification } from "../types/Notification";

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Notification) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) =>
    set((s) => ({
      notifications: [notification, ...s.notifications],
      unreadCount: s.unreadCount + 1,
    })),
}));
