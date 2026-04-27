import { taskDrawerDefaults } from "@entities/task";
import {
  activitiesTabLoaderConfig,
  listActivitiesSearchDefaults,
  listActivitiesSearchSchema,
  type ListActivitiesSearch,
} from "@pages/activities";
import {
  createDrawerCleanerMiddleware,
  createTabCleanerMiddleware,
} from "@shared/libs/search-params";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/activities/")({
  validateSearch: listActivitiesSearchSchema,
  search: {
    middlewares: [
      createTabCleanerMiddleware(listActivitiesSearchDefaults, "projects"),
      createDrawerCleanerMiddleware({
        idKey: "taskId",
        modeKey: "taskMode",
        drawerKeys: ["taskId", "taskMode", "DrawerPageSize", "DrawerOrderBy"],
        modeDefaults: taskDrawerDefaults,
        fallbackMode: "overview",
      }),
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
