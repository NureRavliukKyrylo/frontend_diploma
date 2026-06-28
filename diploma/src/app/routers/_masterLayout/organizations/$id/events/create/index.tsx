import { organizationQuery } from "@entities/organization";
import { CreateEventPage } from "@pages/organizations";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const createEventSearchSchema = z.object({
  projectId: z.string().optional(),
});

export const Route = createFileRoute(
  "/_masterLayout/organizations/$id/events/create/",
)({
  validateSearch: createEventSearchSchema,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(organizationQuery.byId(params.id));
  },
  component: CreateOrganizationEventRoute,
});

function CreateOrganizationEventRoute() {
  const { id } = Route.useParams();
  const { projectId } = Route.useSearch();

  return <CreateEventPage organizationId={id} projectId={projectId} />;
}
