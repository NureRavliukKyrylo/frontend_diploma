import type { TabOption } from "@shared/config/types";
import type { MyProjectsMode } from "@entities/project";

export const myProjectMainTabs: TabOption<MyProjectsMode>[] = [
  { label: "PROJECTS", value: "projects" },
  { label: "EVENTS", value: "events" },
  { label: "TASKS", value: "tasks" },
];
