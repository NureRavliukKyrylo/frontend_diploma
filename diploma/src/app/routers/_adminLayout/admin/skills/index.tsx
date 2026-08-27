import { skillSearchDefaults, skillSearchSchema } from "@entities/skill";
import { AdminSkillsPage } from "@pages/admin";
import { createFileRoute, stripSearchParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_adminLayout/admin/skills/")({
  validateSearch: skillSearchSchema,
  search: {
    middlewares: [stripSearchParams(skillSearchDefaults)],
  },
  component: AdminSkillsPage,
});
