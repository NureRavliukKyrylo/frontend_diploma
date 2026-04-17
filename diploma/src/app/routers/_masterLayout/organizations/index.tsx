import {
  organizationQuery,
  organizationSearchDefaults,
  organizationSearchSchema,
} from "@entities/organization";
import { OrganizationsPageSkeleton } from "@pages/organizations";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/organizations/")({
  validateSearch: organizationSearchSchema,
  search: {
    middlewares: [stripSearchParams(organizationSearchDefaults)],
  },
  loader: async ({ context: { queryClient }, location }) => {
    const search = organizationSearchSchema.parse(location.search);
    await queryClient.ensureQueryData(organizationQuery.list(search));
  },
  pendingComponent: OrganizationsPageSkeleton,
});
