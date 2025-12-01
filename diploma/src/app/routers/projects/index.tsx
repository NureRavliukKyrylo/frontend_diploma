import { createRoute } from "@tanstack/react-router";
import { projectsRootRoute } from "./route";
import { ProjectsPage } from "@pages/projects";

export const projectsMainRoute = createRoute({
  getParentRoute: () => projectsRootRoute,
  path: "/",
  component: ProjectsPage,
});
