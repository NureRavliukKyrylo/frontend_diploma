import { eventsSearchSchema, eventSearchDefaults } from "@entities/event";
import { organizationQuery } from "@entities/organization";
import { projectQuery } from "@entities/project";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/events/")({
  validateSearch: eventsSearchSchema,
  search: {
    middlewares: [stripSearchParams(eventSearchDefaults)],
  },
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery(projectQuery.infinite({ PageSize: 7 }));
    queryClient.prefetchInfiniteQuery(
      organizationQuery.infinite({ PageSize: 7 }),
    );
  },
});
