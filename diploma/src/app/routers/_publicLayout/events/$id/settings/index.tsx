import { eventQuery } from "@entities/event";
import { SettingsEventPage } from "@pages/events";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_publicLayout/events/$id/settings/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(eventQuery.id(params.id));
  },
  component: SettingsEventPage,
});
