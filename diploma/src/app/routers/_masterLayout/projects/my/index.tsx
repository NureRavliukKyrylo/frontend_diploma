import {
  myProjectSearchDefaults,
  myProjectsFiltersSchema,
} from "@entities/project";
import { MyProjectsPage } from "@pages/projects";
import { createFileRoute } from "@tanstack/react-router";
import { type MyProjectsMode } from "@entities/project";
import { filtersQuery } from "@shared/api/filters";

export const Route = createFileRoute("/_masterLayout/projects/my/")({
  component: MyProjectsPage,
  validateSearch: myProjectsFiltersSchema,
  search: {
    middlewares: [
      ({ search, next }) => {
        const result = next(search);
        const tab = (result.tab ?? "projects") as MyProjectsMode;
        const defaults = myProjectSearchDefaults[tab];

        return Object.fromEntries(
          Object.entries(result).filter(
            ([key, value]) =>
              key === "tab" ||
              JSON.stringify(value) !==
                JSON.stringify(defaults[key as keyof typeof defaults]),
          ),
        );
      },
    ],
  },
  loader: async ({ context: { queryClient } }) => {
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
  },
});
