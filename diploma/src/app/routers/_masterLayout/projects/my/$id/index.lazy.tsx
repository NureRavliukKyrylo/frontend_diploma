import { JoinedProjectPageSkeleton } from "@pages/projects";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/projects/my/$id/")({
  pendingComponent: JoinedProjectPageSkeleton,
});
