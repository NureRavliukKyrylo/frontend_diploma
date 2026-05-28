import type { TabOption } from "@shared/config/types";
import type { EventJoinedMode } from "@entities/event";

export const eventJoinedMainTabs: TabOption<EventJoinedMode>[] = [
  { label: "OVERVIEW", value: "overview" },
  { label: "ATTENDANCE", value: "attendance" },
  { label: "TASKS", value: "tasks" },
  { label: "FEEDBACK", value: "feedback" },
];
