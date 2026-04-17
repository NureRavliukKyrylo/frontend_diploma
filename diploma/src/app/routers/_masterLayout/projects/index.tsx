import { categoryQuery } from "@entities/category";
import { organizationQuery } from "@entities/organization";
import {
  projectFiltersWithCategorySchema,
  projectQuery,
  projectSearchDefaults,
} from "@entities/project";
import { ProjectsPageSkeleton } from "@pages/projects";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/projects/")({
  validateSearch: projectFiltersWithCategorySchema,
  search: {
    middlewares: [stripSearchParams(projectSearchDefaults)],
  },
  loader: async ({ context: { queryClient }, location }) => {
    const search = projectFiltersWithCategorySchema.parse(location.search);
    await queryClient.ensureQueryData(projectQuery.list(search));
    queryClient.prefetchInfiniteQuery(categoryQuery.infinite({ PageSize: 7 }));
    queryClient.prefetchInfiniteQuery(
      organizationQuery.infinite({ PageSize: 7 }),
    );
  },
  pendingComponent: ProjectsPageSkeleton,
});
