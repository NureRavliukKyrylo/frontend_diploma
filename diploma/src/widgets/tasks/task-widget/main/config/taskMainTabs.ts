import type { TabOption } from "@shared/config/types";
import type { TaskMode } from "@entities/task";

export const taskMainTabs: TabOption<TaskMode>[] = [
  { label: "OVERVIEW", value: "overview" },
  { label: "MEMBERS", value: "members" },
  { label: "FEEDBACK", value: "feedbacks" },
];
