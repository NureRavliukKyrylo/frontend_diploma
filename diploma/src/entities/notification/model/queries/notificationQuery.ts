import { queryOptions } from "@tanstack/react-query";
import { getListNotifications } from "../../api";
import type { NotificationSearchParams } from "../../libs";

export const notificationKeys = {
  all: () => ["notifications"] as const,
  list: (params: NotificationSearchParams) =>
    [...notificationKeys.all(), "list", params] as const,
};

export const notificationQuery = {
  list: (params: NotificationSearchParams) =>
    queryOptions({
      queryKey: notificationKeys.list({ ...params }),
      queryFn: () => getListNotifications({ ...params }),
      placeholderData: (prev) => prev,
    }),
};
