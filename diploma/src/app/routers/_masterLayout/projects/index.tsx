import { categoryQuery } from "@entities/category";
import {
  projectFiltersWithCategorySchema,
  projectSearchDefaults,
} from "@entities/project";
import { ProjectsPage } from "@pages/projects";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/projects/")({
  component: ProjectsPage,
  validateSearch: projectFiltersWithCategorySchema,
  search: {
    middlewares: [stripSearchParams(projectSearchDefaults)],
  },
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery(categoryQuery.infinite({ pageSize: 5 }));
  },
});
