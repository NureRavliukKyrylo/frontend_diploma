import { eventSearchDefaults, eventsSearchSchema } from "@entities/event";
import { projectBaseSchema, projectSearchDefaults } from "@entities/project";
import { tasksSearchDefaults, tasksSearchSchema } from "@entities/task";
import type { ListActivitiesMode } from "@widgets/activities";
import z from "zod";

export const listActivitiesSearchDefaults = {
  projects: projectSearchDefaults,
  events: eventSearchDefaults,
  tasks: tasksSearchDefaults,
};

export const listActivitiesSearchSchema = z
  .discriminatedUnion("tab", [
    projectBaseSchema,
    eventsSearchSchema,
    tasksSearchSchema,
  ])
  .catch((ctx) => {
    const input = ctx.value as any;
    const tab = input?.tab ?? "projects";
    const defaults = listActivitiesSearchDefaults[tab as ListActivitiesMode];
    return { ...defaults, ...input };
  });

export type ListActivitiesSearch = z.infer<typeof listActivitiesSearchSchema>;
