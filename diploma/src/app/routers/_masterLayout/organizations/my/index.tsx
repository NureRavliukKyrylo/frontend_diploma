import {
  organizationQuery,
  organizationSearchDefaults,
  organizationSearchSchema,
} from "@entities/organization";
import { profileQuery } from "@entities/user/profile";
import { MyOrganizationsPage } from "@pages/organizations";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/organizations/my/")({
  component: MyOrganizationsPage,
  validateSearch: organizationSearchSchema,
  search: {
    middlewares: [stripSearchParams(organizationSearchDefaults)],
  },
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.ensureQueryData(profileQuery.all()),
      queryClient.ensureQueryData(organizationQuery.memberships()),
    ]);
  },
});
