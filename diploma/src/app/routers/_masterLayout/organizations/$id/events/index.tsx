import { organizationQuery } from "@entities/organization";
import { OrganizationDetailsPage } from "@pages/organizations";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/organizations/$id/events/")(
  {
    loader: async ({ context: { queryClient }, params }) => {
      await queryClient.ensureQueryData(organizationQuery.byId(params.id));
    },
    component: OrganizationEventsRoute,
  },
);

function OrganizationEventsRoute() {
  const { id } = Route.useParams();

  return <OrganizationDetailsPage organizationId={id} initialTab="events" />;
}
