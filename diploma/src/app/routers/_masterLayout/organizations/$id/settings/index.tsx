import { organizationQuery } from "@entities/organization";
import { SettingsOrganizationPage } from "@pages/organizations";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/organizations/$id/settings/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(organizationQuery.byId(params.id));
  },
  component: SettingsOrganizationPage,
});
