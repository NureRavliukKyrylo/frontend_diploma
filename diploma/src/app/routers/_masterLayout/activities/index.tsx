import {
  activitiesTabLoaderConfig,
  listActivitiesSearchDefaults,
  listActivitiesSearchSchema,
  type ListActivitiesSearch,
} from "@pages/activities";
import { createTabCleanerMiddleware } from "@shared/libs/search-params";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/activities/")({
  validateSearch: listActivitiesSearchSchema,
  search: {
    middlewares: [
      createTabCleanerMiddleware(listActivitiesSearchDefaults, "projects"),
    ],
  },
  loader: async ({ context: { queryClient }, location }) => {
    const search = location.search as ListActivitiesSearch;
    const config = activitiesTabLoaderConfig[search.tab ?? "projects"];

    const { tab, taskMode, taskId, ...params } = config.schema.parse(
      location.search,
    ) as any;

    await queryClient.ensureQueryData(config.query(params) as any);
    config.prefetch(queryClient);
  },
});
