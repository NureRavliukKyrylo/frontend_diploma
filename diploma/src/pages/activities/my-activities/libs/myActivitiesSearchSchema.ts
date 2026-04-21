import z from "zod";
import { projectsTabSchema, projectsTabDefaults } from "@entities/project";
import { eventsTabSchema, eventsTabDefaults } from "@entities/event";
import { tasksTabSchema, tasksTabDefaults } from "@entities/task";

export const myActivitiesSearchDefaults = {
  projects: projectsTabDefaults,
  events: eventsTabDefaults,
  tasks: tasksTabDefaults,
};

export const myActivitiesSearchSchema = z
  .discriminatedUnion("tab", [
    projectsTabSchema,
    eventsTabSchema,
    tasksTabSchema,
  ])
  .catch({ ...projectsTabDefaults });

export type MyActivitiesSearch = z.infer<typeof myActivitiesSearchSchema>;
