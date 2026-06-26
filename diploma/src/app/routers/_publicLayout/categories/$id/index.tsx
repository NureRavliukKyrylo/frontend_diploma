import { createFileRoute } from "@tanstack/react-router";
import {
  CategoryDetailPageSkeleton,
  categoryDetailSearchSchema,
  categoryDetailSearchDefaults,
  type CategoryDetailSearch,
  categoryDetailTabLoaderConfig,
} from "@pages/categories";
import {
  createDrawerCleanerMiddleware,
  createTabCleanerMiddleware,
} from "@shared/libs/search-params";
import { taskDrawerDefaults } from "@entities/task";
import { categoryQuery } from "@entities/category";

export const Route = createFileRoute("/_publicLayout/categories/$id/")({
  search: {
    middlewares: [
      createTabCleanerMiddleware(categoryDetailSearchDefaults, "projects"),
      createDrawerCleanerMiddleware({
        idKey: "taskId",
        modeKey: "taskMode",
        drawerKeys: ["taskId", "taskMode", "DrawerPageSize", "DrawerOrderBy"],
        modeDefaults: taskDrawerDefaults,
        fallbackMode: "overview",
      }),
    ],
  },
  validateSearch: categoryDetailSearchSchema,
  loader: async ({ context: { queryClient }, params: { id }, location }) => {
    const search = location.search as CategoryDetailSearch;
    const config = categoryDetailTabLoaderConfig[search.tab ?? "projects"];

    const { tab, taskMode, taskId, ...params } = config.schema.parse(
      location.search,
    ) as any;

    await Promise.all([
      queryClient.ensureQueryData(categoryQuery.id(id)),
      queryClient.ensureQueryData(config.query(params, id) as any),
    ]);

    config.prefetch(queryClient);
  },
  pendingComponent: CategoryDetailPageSkeleton,
});
