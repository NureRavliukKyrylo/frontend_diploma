import { categoryQuery } from "@entities/category";
import { skillSearchDefaults, skillSearchSchema } from "@entities/skill";
import { SkillsPageSkeleton } from "@pages/skills";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/skills/")({
  validateSearch: skillSearchSchema,
  search: {
    middlewares: [stripSearchParams(skillSearchDefaults)],
  },
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery(categoryQuery.infinite({ PageSize: 7 }));
  },
  pendingComponent: SkillsPageSkeleton,
});
