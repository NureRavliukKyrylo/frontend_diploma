import { NotificationsPage } from "@pages/notifications";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/notifications/")({
  component: NotificationsPage,
});
