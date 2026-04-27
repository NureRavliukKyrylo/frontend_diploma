import {
  eventDetailDefaults,
  eventDetailSearchSchema,
  eventQuery,
  type EventDetailSearch,
} from "@entities/event";
import { eventDetailTabLoaderConfig, EventPageSkeleton } from "@pages/events";
import { createTabCleanerMiddleware } from "@shared/libs/search-params";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/events/$id/")({
  validateSearch: eventDetailSearchSchema,
  search: {
    middlewares: [createTabCleanerMiddleware(eventDetailDefaults, "overview")],
  },
  loader: async ({ context: { queryClient }, location, params: { id } }) => {
    const search = location.search as EventDetailSearch;

    const config = eventDetailTabLoaderConfig[search.tab ?? "overview"];

    const { tab, ...params } = config.schema.parse(location.search) as any;

    await queryClient.ensureQueryData(eventQuery.id(id));

    const query = config.query(id, params);

    switch (config.queryType) {
      case "none":
        break;
      case "multi":
        await Promise.all(
          (query as any[]).map((q) => queryClient.ensureQueryData(q)),
        );
        break;
      case "infinite":
        await queryClient.ensureInfiniteQueryData(query as any);
        break;
      case "query":
        await queryClient.ensureQueryData(query as any);
        break;
    }

    config.prefetch(queryClient, id);
  },
  pendingComponent: EventPageSkeleton,
});
