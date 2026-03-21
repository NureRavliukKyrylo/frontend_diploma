import {
  myProjectSearchDefaults,
  myProjectsFiltersSchema,
} from "@entities/project";
import { MyProjectsPage } from "@pages/projects";
import { createFileRoute } from "@tanstack/react-router";
import { type MyProjectsMode } from "@entities/project";
import { categoryQuery } from "@entities/category";
import { organizationQuery } from "@entities/organization";

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
      categoryQuery.infiniteMy({ PageSize: 7 }),
    );
    queryClient.prefetchInfiniteQuery(
      organizationQuery.infiniteMy({ PageSize: 7 }),
    );
  },
});
