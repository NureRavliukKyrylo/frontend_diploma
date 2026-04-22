import type { TabOption } from "@shared/config/types";
import type { EventMode } from "@entities/event";

export const eventMainTabs: TabOption<EventMode>[] = [
  { label: "OVERVIEW", value: "overview" },
  { label: "TASKS", value: "tasks" },
  { label: "MEMBERS", value: "members" },
  { label: "FEEDBACK", value: "feedback" },
];
