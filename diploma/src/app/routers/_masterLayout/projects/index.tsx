import { projectSearchSchema } from "@features/projects";
import { ProjectsPage } from "@pages/projects";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/projects/")({
  component: ProjectsPage,
  validateSearch: projectSearchSchema,
});
