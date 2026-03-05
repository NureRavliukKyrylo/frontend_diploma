import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { MapPage } from "@pages/map";
import { projectSearchDefaults, projectSearchSchema } from "@entities/project";
import { categoryQuery } from "@entities/category";

export const Route = createFileRoute("/_masterLayout/map/")({
  component: MapPage,
  validateSearch: projectSearchSchema,
  search: {
    middlewares: [stripSearchParams(projectSearchDefaults)],
  },
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery(categoryQuery.infinite({ pageSize: 5 }));
  },
});
