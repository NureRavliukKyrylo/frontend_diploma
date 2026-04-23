import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { categoryQuery } from "@entities/category";
import {
  projectSearchSchema,
  projectQuery,
  projectSearchDefaults,
} from "@entities/project";
import { organizationQuery } from "@entities/organization";
import { CategoryDetailPageSkeleton } from "@pages/categories";

const { tab, ...searchDefaults } = projectSearchDefaults;

export const Route = createFileRoute("/_masterLayout/categories/$id/")({
  loader: async ({ context: { queryClient }, params: { id }, location }) => {
    const search = projectSearchSchema.parse(location.search);

    await Promise.all([
      queryClient.ensureQueryData(categoryQuery.id(id)),
      queryClient.ensureQueryData(
        projectQuery.list({ ...search, CategoryIds: [id] }),
      ),
    ]);
    queryClient.prefetchInfiniteQuery(
      organizationQuery.infinite({ PageSize: 7 }),
    );
  },
  search: {
    middlewares: [stripSearchParams(searchDefaults)],
  },
  validateSearch: projectSearchSchema,
  pendingComponent: CategoryDetailPageSkeleton,
});
