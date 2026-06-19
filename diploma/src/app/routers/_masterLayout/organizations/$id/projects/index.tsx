import { organizationQuery } from "@entities/organization";
import { OrganizationDetailsPage } from "@pages/organizations";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_masterLayout/organizations/$id/projects/",
)({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(organizationQuery.byId(params.id));
  },
  component: OrganizationProjectsRoute,
});

function OrganizationProjectsRoute() {
  const { id } = Route.useParams();

  return (
    <OrganizationDetailsPage organizationId={id} initialTab="projects" />
  );
}
