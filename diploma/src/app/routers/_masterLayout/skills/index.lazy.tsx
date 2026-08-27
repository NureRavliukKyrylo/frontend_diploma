import { SkillsPage } from "@pages/skills";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/skills/")({
  component: SkillsPage,
});
