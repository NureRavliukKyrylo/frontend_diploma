import {
  MyActivitiesPageSkeleton,
  myActivitiesSearchDefaults,
  myActivitiesSearchSchema,
  tabLoaderConfig,
  type MyActivitiesSearch,
} from "@pages/activities";
import { createFileRoute } from "@tanstack/react-router";
import {
  createDrawerCleanerMiddleware,
  createTabCleanerMiddleware,
} from "@shared/libs/search-params";
import { filtersQuery } from "@shared/api/filters";
import { taskDrawerJoinedDefaults } from "@entities/task";
import { profileQuery } from "@entities/user/profile";

export const Route = createFileRoute("/_masterLayout/activities/my/")({
  validateSearch: myActivitiesSearchSchema,
  search: {
    middlewares: [
      createTabCleanerMiddleware(myActivitiesSearchDefaults, "projects"),
      createDrawerCleanerMiddleware({
        idKey: "taskId",
        modeKey: "taskMode",
        drawerKeys: ["taskId", "taskMode"],
        modeDefaults: taskDrawerJoinedDefaults,
        fallbackMode: "comments",
      }),
    ],
  },
  loader: async ({ context: { queryClient }, location }) => {
    const search = location.search as MyActivitiesSearch;
    const config = tabLoaderConfig[search.tab ?? "projects"];

    const { tab, ...params } = config.schema.parse(location.search) as any;

    await Promise.all([
      queryClient.ensureQueryData(config.query(params) as any),
      queryClient.ensureQueryData(profileQuery.all()),
    ]);

    config.filters.forEach(({ entityType, facetType }) =>
      queryClient.prefetchInfiniteQuery(
        filtersQuery.infinite({ pageSize: 7, entityType, facetType }),
      ),
    );
  },
  pendingComponent: MyActivitiesPageSkeleton,
});
