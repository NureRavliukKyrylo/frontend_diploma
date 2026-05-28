import type { TabOption } from "@shared/config/types";
import type { ProjectJoinedMode } from "@entities/project";

export const joinedProjectMainTabs: TabOption<ProjectJoinedMode>[] = [
  { label: "OVERVIEW", value: "overview" },
  { label: "TASKS", value: "tasks" },
  { label: "FEEDBACK", value: "feedback" },
];
