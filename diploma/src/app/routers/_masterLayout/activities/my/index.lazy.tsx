import { MyActivitiesPage } from "@pages/activities";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/activities/my/")({
  component: MyActivitiesPage,
});
