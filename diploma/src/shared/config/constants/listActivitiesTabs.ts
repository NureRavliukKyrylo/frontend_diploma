import type { ListActivitiesMode, TabOption } from "@shared/config/types";

export const listActivitiesTabs: TabOption<ListActivitiesMode>[] = [
  { label: "PROJECTS", value: "projects" },
  { label: "EVENTS", value: "events" },
  { label: "TASKS", value: "tasks" },
];
