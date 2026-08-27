import { eventSearchDefaults, eventsNoCategoriesSchema } from "@entities/event";
import {
  projectsNoCategoriesSchema,
  projectSearchDefaults,
} from "@entities/project";
import { tasksNoCategoriesSchema, tasksSearchDefaults } from "@entities/task";
import type { ListActivitiesMode } from "@shared/config/types";
import z from "zod";

export const categoryDetailSearchDefaults = {
  projects: projectSearchDefaults,
  events: eventSearchDefaults,
  tasks: tasksSearchDefaults,
};

export const categoryDetailSearchSchema = z
  .discriminatedUnion("tab", [
    projectsNoCategoriesSchema,
    eventsNoCategoriesSchema,
    tasksNoCategoriesSchema,
  ])
  .catch((ctx) => {
    const input = ctx.value as any;
    const tab = input?.tab ?? "projects";
    const defaults = categoryDetailSearchDefaults[tab as ListActivitiesMode];
    return { ...defaults, ...input };
  });

export type CategoryDetailSearch = z.infer<typeof categoryDetailSearchSchema>;
