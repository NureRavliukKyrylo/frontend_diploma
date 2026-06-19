import { organizationQuery } from "@entities/organization";
import { OrganizationDetailsPage } from "@pages/organizations";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/organizations/$id/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(organizationQuery.byId(params.id));
  },
  component: OrganizationDetailsRoute,
});

function OrganizationDetailsRoute() {
  const { id } = Route.useParams();

  return <OrganizationDetailsPage organizationId={id} />;
}

export function DevelopOrganizationDetailsPlaceholder() {
  return <div>Hello "/_masterLayout/organizations/$id/"!</div>;
}
