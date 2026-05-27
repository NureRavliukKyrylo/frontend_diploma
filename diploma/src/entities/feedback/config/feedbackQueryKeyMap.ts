import { eventKeys } from "@entities/event";
import { projectKeys } from "@entities/project";
import { taskKeys } from "@entities/task";
import type { EntityType } from "@shared/config/types";

export const feedbackQueryKeyMap = {
  project: { id: projectKeys.id },
  event: { id: eventKeys.id },
  task: { id: taskKeys.id },
} satisfies Record<
  Exclude<EntityType, "organization">,
  { id: (id: string) => readonly string[] }
>;
