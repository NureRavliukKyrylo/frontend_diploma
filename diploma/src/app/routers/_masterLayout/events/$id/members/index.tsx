import { eventQuery } from "@entities/event";
import { EventMembersPage } from "@pages/events";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/events/$id/members/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(eventQuery.id(params.id));
  },
  component: EventMembersPage,
});
