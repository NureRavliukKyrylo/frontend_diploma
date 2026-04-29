import { badgesQuery } from "@entities/badge";
import { skillsQuery } from "@entities/skill";
import {
  profileSearchDefaults,
  profileSearchSchema,
  type InventoryProfileSearchParams,
  type ProfileSearchParams,
  type SkillsProfileSearchParams,
} from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import { MainProfilePageSkeleton } from "@pages/profile";
import { createTabCleanerMiddleware } from "@shared/libs/search-params";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/profile/")({
  validateSearch: profileSearchSchema,
  search: {
    middlewares: [createTabCleanerMiddleware(profileSearchDefaults, "profile")],
  },
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient }, deps }) => {
    const { tab, ...search } = deps as ProfileSearchParams;

    await queryClient.ensureQueryData(profileQuery.all());
    queryClient.prefetchInfiniteQuery(
      badgesQuery.infiniteMy(search as InventoryProfileSearchParams),
    );

    if (tab === "skills") {
      queryClient.prefetchQuery(
        skillsQuery.my(search as SkillsProfileSearchParams),
      );
    }
  },
  pendingComponent: MainProfilePageSkeleton,
});
