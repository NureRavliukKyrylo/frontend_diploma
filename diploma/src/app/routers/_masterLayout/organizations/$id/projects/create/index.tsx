import { organizationQuery } from "@entities/organization";
import { CreateProjectPage } from "@pages/organizations";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_masterLayout/organizations/$id/projects/create/",
)({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(organizationQuery.byId(params.id));
  },
  component: CreateOrganizationProjectRoute,
});

function CreateOrganizationProjectRoute() {
  const { id } = Route.useParams();

  return <CreateProjectPage organizationId={id} />;
}
