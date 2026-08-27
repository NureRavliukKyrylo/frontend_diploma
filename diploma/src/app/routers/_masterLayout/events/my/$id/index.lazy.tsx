import { JoinedEventPageSkeleton } from "@pages/events";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/events/my/$id/")({
  pendingComponent: JoinedEventPageSkeleton,
});
