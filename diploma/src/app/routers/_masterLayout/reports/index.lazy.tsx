import { ReportsPageSkeleton } from "@pages/reports/ui/ReportsPageSkeleton";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/reports/")({
  pendingComponent: ReportsPageSkeleton,
});
