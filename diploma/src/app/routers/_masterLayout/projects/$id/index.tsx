import {
  projectDetailDefaults,
  projectDetailSearchSchema,
  type ProjectDetailSearch,
} from "@entities/project";
import { projectQuery } from "@entities/project";
import { taskDrawerDefaults } from "@entities/task";
import {
  projectDetailTabLoaderConfig,
  ProjectPageSkeleton,
} from "@pages/projects";
import {
  createDrawerCleanerMiddleware,
  createTabCleanerMiddleware,
} from "@shared/libs/search-params";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/projects/$id/")({
  validateSearch: projectDetailSearchSchema,
  search: {
    middlewares: [
      createTabCleanerMiddleware(projectDetailDefaults, "overview"),
      createDrawerCleanerMiddleware({
        idKey: "taskId",
        modeKey: "taskMode",
        drawerKeys: ["taskId", "taskMode", "DrawerPageSize", "DrawerOrderBy"],
        modeDefaults: taskDrawerDefaults,
        fallbackMode: "overview",
      }),
    ],
  },
  loader: async ({ context: { queryClient }, params: { id }, location }) => {
    const search = location.search as ProjectDetailSearch;
    const config = projectDetailTabLoaderConfig[search.tab ?? "overview"];

    const { tab, ...params } = config.schema.parse(location.search) as any;

    await queryClient.ensureQueryData(projectQuery.id(id));

    const query = config.query(id, params);

    switch (config.queryType) {
      case "none":
        break;
      case "multi":
        await Promise.all(
          (query as any[]).map((q) => queryClient.ensureInfiniteQueryData(q)),
        );
        break;
      case "infinite":
        await queryClient.ensureInfiniteQueryData(query as any);
        break;
      case "query":
        await queryClient.ensureQueryData(query as any);
        break;
    }

    config.prefetch(queryClient, id);
  },
  pendingComponent: ProjectPageSkeleton,
});
