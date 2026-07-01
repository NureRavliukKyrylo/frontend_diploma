import { projectQuery } from "@entities/project";
import { ProjectRolesPage } from "@pages/projects";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/projects/$id/roles/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(projectQuery.id(params.id));
  },
  component: ProjectRolesPage,
});
