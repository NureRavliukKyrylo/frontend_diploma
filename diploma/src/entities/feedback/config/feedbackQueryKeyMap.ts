import { eventKeys } from "@entities/event";
import { organizationKeys } from "@entities/organization";
import { projectKeys } from "@entities/project";
import { taskKeys } from "@entities/task";
import type { EntityType } from "@shared/config/types";

export const feedbackQueryKeyMap = {
  organization: { id: organizationKeys.details },
  project: { id: projectKeys.id },
  event: { id: eventKeys.id },
  task: { id: taskKeys.id },
} satisfies Record<EntityType, { id: (id: string) => readonly string[] }>;
