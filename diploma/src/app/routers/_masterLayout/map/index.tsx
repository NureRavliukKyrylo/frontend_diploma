import { categoryQuery } from "@entities/category";
import { organizationQuery } from "@entities/organization";
import { mapProjectDefaults, mapProjectSchema } from "@entities/project";
import { MapPage } from "@pages/map";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/map/")({
  component: MapPage,
  validateSearch: mapProjectSchema,
  search: {
    middlewares: [stripSearchParams(mapProjectDefaults)],
  },
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery(categoryQuery.infinite({ pageSize: 5 }));
    queryClient.prefetchInfiniteQuery(
      organizationQuery.infinite({ pageSize: 5 }),
    );
  },
});
