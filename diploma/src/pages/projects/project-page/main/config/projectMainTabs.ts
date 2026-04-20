import type { TabOption } from "@shared/config/types";
import type { ProjectMode } from "@entities/project";

export const projectMainTabs: TabOption<ProjectMode>[] = [
  { label: "OVERVIEW", value: "overview" },
  { label: "EVENTS", value: "events" },
  { label: "TASKS", value: "tasks" },
  { label: "MEMBERS", value: "members" },
  { label: "FEEDBACK", value: "feedback" },
];
