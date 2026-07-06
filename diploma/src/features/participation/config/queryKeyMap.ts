import { eventKeys } from "@entities/event";
import { projectKeys } from "@entities/project";
import { taskKeys } from "@entities/task";
import { calendarKeys } from "@entities/user/calendar";
import type { EntityType } from "@shared/config/types";

export const queryKeyMap = {
  project: { mys: projectKeys.mys, id: projectKeys.id },
  event: {
    mys: eventKeys.mys,
    id: eventKeys.id,
    calendar: calendarKeys.activities,
  },
  task: {
    mys: taskKeys.mys,
    id: taskKeys.id,
    calendar: calendarKeys.activities,
  },
} satisfies Record<
  Exclude<EntityType, "organization">,
  {
    mys: () => readonly string[];
    id: (id: string) => readonly string[];
    calendar?: () => readonly string[];
  }
>;
