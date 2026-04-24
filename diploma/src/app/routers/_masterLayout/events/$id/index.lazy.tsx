import { EventPage } from "@pages/events";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/events/$id/")({
  component: EventPage,
});
