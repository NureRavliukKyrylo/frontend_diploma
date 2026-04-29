import { eventKeys } from "@entities/event";
import { projectKeys } from "@entities/project";
import { taskKeys } from "@entities/task";
import type { EntityType } from "@shared/config/types";

export const queryKeyMap = {
  project: projectKeys.mys,
  event: eventKeys.mys,
  task: taskKeys.mys,
} satisfies Record<
  Exclude<EntityType, "organization">,
  () => readonly string[]
>;
