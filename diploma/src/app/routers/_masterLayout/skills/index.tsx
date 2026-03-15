import { skillSearchSchema } from "@entities/skill";
import { skillSearchDefaults } from "@entities/skill/libs/SkillsSearchParams";
import { SkillsPage } from "@pages/skills";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/skills/")({
  component: SkillsPage,
  validateSearch: skillSearchSchema,
  search: {
    middlewares: [stripSearchParams(skillSearchDefaults)],
  },
});
