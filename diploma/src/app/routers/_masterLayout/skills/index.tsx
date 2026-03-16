import { categoryQuery } from "@entities/category";
import { skillSearchDefaults, skillSearchSchema } from "@entities/skill";
import { SkillsPage } from "@pages/skills";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/skills/")({
  component: SkillsPage,
  validateSearch: skillSearchSchema,
  search: {
    middlewares: [stripSearchParams(skillSearchDefaults)],
  },
  loader: async ({ context: { queryClient } }) => {
    queryClient.prefetchInfiniteQuery(categoryQuery.infinite({ PageSize: 7 }));
  },
});
