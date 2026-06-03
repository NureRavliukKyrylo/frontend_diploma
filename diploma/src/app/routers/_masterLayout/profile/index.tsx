import {
  profileSearchDefaults,
  profileSearchSchema,
  type ProfileSearchParams,
} from "@entities/user";
import { profileQuery } from "@entities/user/profile";
import {
  MainProfilePageSkeleton,
  profileTabLoaderConfig,
} from "@pages/profile";
import { createTabCleanerMiddleware } from "@shared/libs/search-params";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/profile/")({
  validateSearch: profileSearchSchema,
  search: {
    middlewares: [createTabCleanerMiddleware(profileSearchDefaults, "profile")],
  },
  loader: async ({ context: { queryClient }, location }) => {
    const { tab, badgeId, ...params } = profileSearchSchema.parse(
      location.search,
    ) as ProfileSearchParams & { badgeId: string };

    const config = profileTabLoaderConfig[tab ?? "profile"];

    await queryClient.ensureQueryData(profileQuery.all());

    if (config.infinite) {
      if (config.queryType === "multi") {
        const queries = config.query(params as any) as any[];
        await Promise.all(
          queries.map((q) => queryClient.ensureInfiniteQueryData(q)),
        );
      } else {
        await queryClient.ensureInfiniteQueryData(
          config.query(params as any) as any,
        );
      }
    } else {
      await queryClient.ensureQueryData(config.query(params as any) as any);
    }

    config.prefetch(queryClient);
  },
  pendingComponent: MainProfilePageSkeleton,
});
