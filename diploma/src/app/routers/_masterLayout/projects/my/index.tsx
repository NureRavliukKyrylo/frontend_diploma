import {
  myProjectsSearchDefaults,
  myProjectsFiltersSchema,
  type MyProjectsBaseSearch,
} from "@entities/project";
import { createFileRoute } from "@tanstack/react-router";
import { type MyProjectsMode } from "@entities/project";
import { filtersQuery } from "@shared/api/filters";
import { MyProjectsPageSkeleton } from "@pages/projects";

export const Route = createFileRoute("/_masterLayout/projects/my/")({
  validateSearch: myProjectsFiltersSchema,
  loaderDeps: ({ search }) => search,
  search: {
    middlewares: [
      ({ search, next }) => {
        const result = next(search) as MyProjectsBaseSearch;
        const tab = (result.tab ?? "projects") as MyProjectsMode;
        const defaults = myProjectsSearchDefaults[tab];
        const globalTabDefault = "projects";

        return Object.fromEntries(
          Object.entries(result).filter(([key, value]) => {
            if (key === "tab") return value !== globalTabDefault;
            return (
              JSON.stringify(value) !==
              JSON.stringify(defaults[key as keyof typeof defaults])
            );
          }),
        );
      },
    ],
  },
  loader: async ({ context: { queryClient }, deps }) => {
    const search = deps as MyProjectsBaseSearch;

    if (search.tab === "events") {
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
    } else {
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
