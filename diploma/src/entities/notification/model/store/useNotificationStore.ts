import { create } from "zustand";
import type { Notification } from "../types/Notification";

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  toastNotifications: Notification[];
  setUnreadCount: (count: number) => void;
  addNotification: (notification: Notification) => void;
  removeToast: (id: string) => void;
  decrementUnread: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  toastNotifications: [],

  addNotification: (notification) =>
    set((s) => ({
      notifications: [notification, ...s.notifications],
      unreadCount: s.unreadCount + 1,
      toastNotifications: [notification, ...s.toastNotifications],
    })),

  setUnreadCount: (count) => set({ unreadCount: count }),

  removeToast: (id) =>
    set((s) => ({
      toastNotifications: s.toastNotifications.filter((n) => n.id !== id),
    })),

  decrementUnread: () =>
    set((s) => ({
      unreadCount: Math.max(0, s.unreadCount - 1),
    })),
}));
