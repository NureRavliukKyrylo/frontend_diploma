import type { TabOption } from "@shared/config/types";
import type { ListActivitiesMode } from "./ListActivitiesMode";

export const listActivitiesTabs: TabOption<ListActivitiesMode>[] = [
  { label: "PROJECTS", value: "projects" },
  { label: "EVENTS", value: "events" },
  { label: "TASKS", value: "tasks" },
];
