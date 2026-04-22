import { eventSearchDefaults, eventsSearchSchema } from "@entities/event";
import { projectBaseSchema, projectSearchDefaults } from "@entities/project";
import { tasksSearchDefaults, tasksSearchSchema } from "@entities/task";
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
  .catch({ ...projectSearchDefaults });

export type ListActivitiesSearch = z.infer<typeof listActivitiesSearchSchema>;
