import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import { CategoryDetailPage } from "@pages/categories";
import { categoryQuery } from "@entities/category";
import {
  baseProjectSearchSchema,
  projectQuery,
  projectSearchDefaults,
} from "@entities/project";

export const Route = createFileRoute("/_masterLayout/categories/$id/")({
  component: CategoryDetailPage,
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
  },
  search: {
    middlewares: [stripSearchParams(projectSearchDefaults)],
  },
  validateSearch: baseProjectSearchSchema,
});
