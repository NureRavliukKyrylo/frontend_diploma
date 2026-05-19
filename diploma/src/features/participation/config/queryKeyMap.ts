import { eventKeys } from "@entities/event";
import { projectKeys } from "@entities/project";
import { taskKeys } from "@entities/task";
import type { EntityType } from "@shared/config/types";

export const queryKeyMap = {
  project: { mys: projectKeys.mys, id: projectKeys.id },
  event: { mys: eventKeys.mys, id: eventKeys.id },
  task: { mys: taskKeys.mys, id: taskKeys.id },
} satisfies Record<
  Exclude<EntityType, "organization">,
  { mys: () => readonly string[]; id: (id: string) => readonly string[] }
>;
