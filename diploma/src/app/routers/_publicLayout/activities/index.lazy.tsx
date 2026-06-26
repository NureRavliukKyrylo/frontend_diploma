import { ListActivitiesPage } from "@pages/activities";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_publicLayout/activities/")({
  component: ListActivitiesPage,
});
