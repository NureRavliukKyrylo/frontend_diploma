import { projectQuery } from "@entities/project";
import { SettingsProjectPage } from "@pages/projects";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/projects/$id/settings/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(projectQuery.id(params.id));
  },
  component: SettingsProjectPage,
});
