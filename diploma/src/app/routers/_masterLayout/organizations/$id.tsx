import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { organizationQuery } from "@entities/organization";
import { OrganizationFab } from "@widgets/organizations";

export const Route = createFileRoute("/_masterLayout/organizations/$id")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(organizationQuery.byId(params.id));
  },
  component: OrganizationRouteLayout,
});

function OrganizationRouteLayout() {
  const { id } = Route.useParams();
  const { data: organization } = useQuery(organizationQuery.byId(id));

  return (
    <>
      <Outlet />
      {organization ? (
        <OrganizationFab organizationId={id} organization={organization} />
      ) : null}
    </>
  );
}
