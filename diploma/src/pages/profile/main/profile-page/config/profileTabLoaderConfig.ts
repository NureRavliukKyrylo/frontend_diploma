import { profileQuery } from "@entities/user/profile";
import {
  inventoryTabSchema,
  profileSearchDefaults,
  profileTabSchema,
  skillsTabSchema,
  statisticsTabSchema,
  type InventoryProfileSearchParams,
  type SkillsProfileSearchParams,
} from "@entities/user";
import type { QueryClient } from "@tanstack/react-query";
import type { z, ZodType } from "zod";
import { skillsQuery } from "@entities/skill";
import { badgesQuery } from "@entities/badge";

type ProfileTabParams =
  | SkillsProfileSearchParams
  | InventoryProfileSearchParams
  | z.infer<typeof profileTabSchema>
  | z.infer<typeof statisticsTabSchema>;

type ProfileTabConfig<T extends ProfileTabParams> = {
  schema: ZodType<T>;
  query: (params: T) => unknown;
  prefetch: (queryClient: QueryClient) => void;
  infinite?: boolean;
};

const { tab: _s, ...skillsDefaults } = profileSearchDefaults.skills;
const { tab: _i, ...inventoryDefaults } = profileSearchDefaults.inventory;

export const profileTabLoaderConfig: {
  profile: ProfileTabConfig<z.infer<typeof profileTabSchema>>;
  statistics: ProfileTabConfig<z.infer<typeof statisticsTabSchema>>;
  skills: ProfileTabConfig<SkillsProfileSearchParams>;
  inventory: ProfileTabConfig<InventoryProfileSearchParams>;
} = {
  profile: {
    schema: profileTabSchema,
    query: () => profileQuery.all(),
    prefetch: (queryClient) => {
      queryClient.prefetchQuery(skillsQuery.my(skillsDefaults));
      queryClient.prefetchInfiniteQuery(
        badgesQuery.infiniteMy(inventoryDefaults),
      );
    },
  },
  statistics: {
    schema: statisticsTabSchema,
    query: () => profileQuery.all(),
    prefetch: (queryClient) => {
      queryClient.prefetchQuery(skillsQuery.my(skillsDefaults));
      queryClient.prefetchInfiniteQuery(
        badgesQuery.infiniteMy(inventoryDefaults),
      );
    },
  },
  skills: {
    schema: skillsTabSchema,
    query: (params) => skillsQuery.my(params),
    prefetch: (queryClient) => {
      queryClient.prefetchInfiniteQuery(
        badgesQuery.infiniteMy(inventoryDefaults),
      );
    },
  },
  inventory: {
    schema: inventoryTabSchema,
    query: (params) => badgesQuery.infiniteMy(params),
    prefetch: (queryClient) => {
      queryClient.prefetchQuery(skillsQuery.my(skillsDefaults));
    },
    infinite: true,
  },
};
