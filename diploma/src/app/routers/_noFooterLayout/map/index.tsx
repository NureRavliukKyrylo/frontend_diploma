import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { mapProjectDefaults, mapProjectSchema } from "@entities/project";
import { categoryQuery } from "@entities/category";
import { organizationQuery } from "@entities/organization";

export const Route = createFileRoute("/_noFooterLayout/map/")({
  validateSearch: mapProjectSchema,
  search: {
    middlewares: [stripSearchParams(mapProjectDefaults)],
  },
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery(categoryQuery.infinite({ PageSize: 7 }));

    queryClient.prefetchInfiniteQuery(
      organizationQuery.infinite({ PageSize: 7 }),
    );
  },
});
