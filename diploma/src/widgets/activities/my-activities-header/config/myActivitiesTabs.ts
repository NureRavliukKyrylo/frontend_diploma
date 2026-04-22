import type { TabOption } from "@shared/config/types";
import type { MyActivitiesMode } from "./MyActivitiesMode";

export const myActivitiesTabs: TabOption<MyActivitiesMode>[] = [
  { label: "PROJECTS", value: "projects" },
  { label: "EVENTS", value: "events" },
  { label: "TASKS", value: "tasks" },
];
