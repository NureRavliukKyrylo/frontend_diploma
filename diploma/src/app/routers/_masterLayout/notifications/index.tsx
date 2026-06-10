import {
  notificationDefaults,
  notificationQuery,
  notificationSearchSchema,
} from "@entities/notification";
import {
  NotificationsPage,
  NotificationsPageSkeleton,
} from "@pages/notifications";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/notifications/")({
  component: NotificationsPage,
  validateSearch: notificationSearchSchema,
  search: {
    middlewares: [stripSearchParams(notificationDefaults)],
  },
  pendingComponent: NotificationsPageSkeleton,
  loader: async ({ context: { queryClient }, location }) => {
    const search = notificationSearchSchema.parse(location.search);
    await Promise.all([
      queryClient.ensureQueryData(notificationQuery.list(search)),
      queryClient.ensureQueryData(notificationQuery.unreadCount()),
    ]);
  },
});
