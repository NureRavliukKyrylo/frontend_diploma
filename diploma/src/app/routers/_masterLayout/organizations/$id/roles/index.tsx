import { organizationQuery } from "@entities/organization";
import { OrganizationRolesPage } from "@pages/organizations";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/organizations/$id/roles/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(organizationQuery.byId(params.id));
  },
  component: OrganizationRolesPage,
});
