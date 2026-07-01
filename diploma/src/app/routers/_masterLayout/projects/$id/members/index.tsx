import { projectQuery } from "@entities/project";
import { ProjectMembersPage } from "@pages/projects";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/projects/$id/members/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(projectQuery.id(params.id));
  },
  component: ProjectMembersPage,
});
