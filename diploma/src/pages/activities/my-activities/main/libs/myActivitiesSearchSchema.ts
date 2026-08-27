import z from "zod";
import { projectsTabSchema, projectsTabDefaults } from "@entities/project";
import { eventsTabSchema, eventsTabDefaults } from "@entities/event";
import { joinedTaskSearchSchema, joinedTaskTabDefaults } from "@entities/task";
import type { MyActivitiesMode } from "@widgets/activities";

export const myActivitiesSearchDefaults = {
  projects: projectsTabDefaults,
  events: eventsTabDefaults,
  tasks: joinedTaskTabDefaults,
};

export const myActivitiesSearchSchema = z
  .discriminatedUnion("tab", [
    projectsTabSchema,
    eventsTabSchema,
    joinedTaskSearchSchema,
  ])
  .catch((ctx) => {
    const input = ctx.value as any;
    const tab = input?.tab ?? "projects";
    const defaults = myActivitiesSearchDefaults[tab as MyActivitiesMode];
    return { ...defaults, ...input };
  });

export type MyActivitiesSearch = z.infer<typeof myActivitiesSearchSchema>;
