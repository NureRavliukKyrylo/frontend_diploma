import { EventPage } from "@pages/events";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_publicLayout/events/$id/")({
  component: EventPage,
});
