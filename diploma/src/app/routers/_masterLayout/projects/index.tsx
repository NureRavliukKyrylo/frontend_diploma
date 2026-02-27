import { projectSearchDefaults, projectSearchSchema } from "@entities/project";
import { ProjectsPage } from "@pages/projects";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/projects/")({
  component: ProjectsPage,
  validateSearch: projectSearchSchema,
  search: {
    middlewares: [stripSearchParams(projectSearchDefaults)],
  },
});
