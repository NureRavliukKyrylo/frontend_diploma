import {
  MyActivitiesPageSkeleton,
  myActivitiesSearchDefaults,
  myActivitiesSearchSchema,
  tabLoaderConfig,
  type MyActivitiesSearch,
} from "@pages/activities";
import { createFileRoute } from "@tanstack/react-router";
import { createTabCleanerMiddleware } from "@shared/libs/search-params";
import { filtersQuery } from "@shared/api/filters";

export const Route = createFileRoute("/_masterLayout/activities/my/")({
  validateSearch: myActivitiesSearchSchema,
  search: {
    middlewares: [
      createTabCleanerMiddleware(myActivitiesSearchDefaults, "projects"),
    ],
  },
  loader: async ({ context: { queryClient }, location }) => {
    const search = location.search as MyActivitiesSearch;
    const config = tabLoaderConfig[search.tab ?? "projects"];

    const { tab, ...params } = config.schema.parse(location.search) as any;

    await queryClient.ensureQueryData(config.query(params) as any);

    config.filters.forEach(({ entityType, facetType }) =>
      queryClient.prefetchInfiniteQuery(
        filtersQuery.infinite({ pageSize: 7, entityType, facetType }),
      ),
    );
  },
  pendingComponent: MyActivitiesPageSkeleton,
});
