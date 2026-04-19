import {
  myProjectsSearchDefaults,
  myProjectsFiltersSchema,
  type MyProjectsBaseSearch,
  eventsTabSchema,
  projectsTabSchema,
  tasksTabSchema,
  projectQuery,
} from "@entities/project";
import { createFileRoute } from "@tanstack/react-router";
import { filtersQuery } from "@shared/api/filters";
import { MyProjectsPageSkeleton } from "@pages/projects";
import { eventQuery } from "@entities/event";
import { taskQuery } from "@entities/task";
import { createTabCleanerMiddleware } from "@shared/libs/search-params";

export const Route = createFileRoute("/_masterLayout/projects/my/")({
  validateSearch: myProjectsFiltersSchema,
  search: {
    middlewares: [
      createTabCleanerMiddleware(myProjectsSearchDefaults, "projects"),
    ],
  },
  loader: async ({ context: { queryClient }, location }) => {
    const search = location.search as MyProjectsBaseSearch;
    let searchParams;
    if (search.tab === "events") {
      searchParams = eventsTabSchema.parse(location.search);
      await queryClient.ensureQueryData(eventQuery.my(searchParams));
      queryClient.prefetchInfiniteQuery(
        filtersQuery.infinite({
          pageSize: 7,
          entityType: "event",
          facetType: "project",
        }),
      );
      queryClient.prefetchInfiniteQuery(
        filtersQuery.infinite({
          pageSize: 7,
          entityType: "event",
          facetType: "organization",
        }),
      );
    } else if (search.tab === "tasks") {
      searchParams = tasksTabSchema.parse(location.search);
      await queryClient.ensureQueryData(taskQuery.my(searchParams));
      queryClient.prefetchInfiniteQuery(
        filtersQuery.infinite({
          pageSize: 7,
          entityType: "task",
          facetType: "project",
        }),
      );
      queryClient.prefetchInfiniteQuery(
        filtersQuery.infinite({
          pageSize: 7,
          entityType: "task",
          facetType: "organization",
        }),
      );
      queryClient.prefetchInfiniteQuery(
        filtersQuery.infinite({
          pageSize: 7,
          entityType: "task",
          facetType: "event",
        }),
      );
    } else {
      searchParams = projectsTabSchema.parse(location.search);
      await queryClient.ensureQueryData(projectQuery.my(searchParams));
      queryClient.prefetchInfiniteQuery(
        filtersQuery.infinite({
          pageSize: 7,
          entityType: "project",
          facetType: "category",
        }),
      );
      queryClient.prefetchInfiniteQuery(
        filtersQuery.infinite({
          pageSize: 7,
          entityType: "project",
          facetType: "organization",
        }),
      );
    }
  },
  pendingComponent: MyProjectsPageSkeleton,
});
