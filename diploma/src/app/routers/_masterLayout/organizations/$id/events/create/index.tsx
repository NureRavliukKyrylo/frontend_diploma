import { organizationQuery } from "@entities/organization";
import { CreateEventPage } from "@pages/organizations";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_masterLayout/organizations/$id/events/create/",
)({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(organizationQuery.byId(params.id));
  },
  component: CreateOrganizationEventRoute,
});

function CreateOrganizationEventRoute() {
  const { id } = Route.useParams();

  return <CreateEventPage organizationId={id} />;
}
