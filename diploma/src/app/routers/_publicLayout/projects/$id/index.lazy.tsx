import { ProjectPage } from "@pages/projects";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_publicLayout/projects/$id/")({
  component: ProjectPage,
});
