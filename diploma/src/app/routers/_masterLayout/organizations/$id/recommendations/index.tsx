import { createFileRoute } from "@tanstack/react-router";
import { organizationQuery } from "@entities/organization";
import { RecommendedVolunteersPage } from "@pages/organizations";

export const Route = createFileRoute(
  "/_masterLayout/organizations/$id/recommendations/",
)({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(organizationQuery.byId(params.id));
  },
  component: OrganizationRecommendationsRoute,
});

function OrganizationRecommendationsRoute() {
  const { id } = Route.useParams();

  return (
    <RecommendedVolunteersPage entityType="organization" entityId={id} />
  );
}
