import {
  notificationDefaults,
  notificationSearchSchema,
} from "@entities/notification";
import { NotificationsPage } from "@pages/notifications";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/notifications/")({
  component: NotificationsPage,
  validateSearch: notificationSearchSchema,
  search: {
    middlewares: [stripSearchParams(notificationDefaults)],
  },
});
