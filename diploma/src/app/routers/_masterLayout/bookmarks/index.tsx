import { taskDrawerDefaults } from "@entities/task";
import {
  activitiesTabLoaderConfig,
  ListActivitiesPage,
  ListActivitiesPageSkeleton,
  listActivitiesSearchDefaults,
  listActivitiesSearchSchema,
  type ListActivitiesSearch,
} from "@pages/activities";
import {
  createDrawerCleanerMiddleware,
  createTabCleanerMiddleware,
} from "@shared/libs/search-params";
import { createFileRoute } from "@tanstack/react-router";

const bookmarksSearchDefaults = {
  projects: {
    ...listActivitiesSearchDefaults.projects,
    ShowJoined: true,
  },
  events: {
    ...listActivitiesSearchDefaults.events,
    ShowJoined: true,
  },
  tasks: {
    ...listActivitiesSearchDefaults.tasks,
    ShowJoined: true,
  },
};

const withJoinedOnly = (search: ListActivitiesSearch): ListActivitiesSearch =>
  ({ ...search, ShowJoined: true }) as ListActivitiesSearch;

export const Route = createFileRoute("/_masterLayout/bookmarks/")({
  validateSearch: (search) =>
    withJoinedOnly(listActivitiesSearchSchema.parse(search)),
  search: {
    middlewares: [
      createTabCleanerMiddleware(bookmarksSearchDefaults, "projects"),
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
    const search = withJoinedOnly(location.search as ListActivitiesSearch);
    const config = activitiesTabLoaderConfig[search.tab ?? "projects"];

    const { tab, taskMode, taskId, ...params } = config.schema.parse(
      search,
    ) as any;

    await queryClient.ensureQueryData(
      config.query({ ...params, ShowJoined: true }) as any,
    );
    config.prefetch(queryClient);
  },
  pendingComponent: ListActivitiesPageSkeleton,
  component: () => (
    <ListActivitiesPage
      routeFrom="/_masterLayout/bookmarks/"
      navigateFrom="/bookmarks/"
      joinedOnly
      hideOrganizationFilter
    />
  ),
});
