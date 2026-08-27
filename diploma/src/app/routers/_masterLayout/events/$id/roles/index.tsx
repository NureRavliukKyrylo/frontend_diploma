import { eventQuery } from "@entities/event";
import { EventRolesPage } from "@pages/events";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/events/$id/roles/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(eventQuery.id(params.id));
  },
  component: EventRolesPage,
});
