import { categoryQuery } from "@entities/category";
import { organizationQuery } from "@entities/organization";
import {
  projectFiltersWithCategorySchema,
  projectSearchDefaults,
} from "@entities/project";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/projects/")({
  validateSearch: projectFiltersWithCategorySchema,
  search: {
    middlewares: [stripSearchParams(projectSearchDefaults)],
  },
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery(categoryQuery.infinite({ PageSize: 7 }));
    queryClient.prefetchInfiniteQuery(
      organizationQuery.infinite({ PageSize: 7 }),
    );
  },
});
