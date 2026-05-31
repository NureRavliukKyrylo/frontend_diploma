import type { TabOption } from "@shared/config/types";
import type { TaskJoinedMode } from "@entities/task";

export const taskJoinedMainTabs: TabOption<TaskJoinedMode>[] = [
  { label: "COMMENTS", value: "comments" },
  { label: "FEEDBACK", value: "feedback" },
];
