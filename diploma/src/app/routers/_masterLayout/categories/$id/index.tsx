import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { categoryQuery } from "@entities/category";
import {
  projectSearchSchema,
  projectQuery,
  projectSearchDefaults,
} from "@entities/project";
import { organizationQuery } from "@entities/organization";

export const Route = createFileRoute("/_masterLayout/categories/$id/")({
  loader: async ({ context: { queryClient }, params: { id } }) => {
    await Promise.all([
      queryClient.ensureQueryData(categoryQuery.id(id)),
      queryClient.ensureQueryData(
        projectQuery.list({
          ...projectSearchDefaults,
          CategoryIds: [id],
        }),
      ),
    ]);
    queryClient.prefetchInfiniteQuery(
      organizationQuery.infinite({ PageSize: 7 }),
    );
  },
  search: {
    middlewares: [stripSearchParams(projectSearchDefaults)],
  },
  validateSearch: projectSearchSchema,
});
