import { ENTITY_STATUS_MAP } from "@shared/config/constants";
import type { EntityStatus, StatusConfig } from "@shared/config/types";

export const getEntityStatusConfig = (state: EntityStatus): StatusConfig =>
  ENTITY_STATUS_MAP[state] ?? ENTITY_STATUS_MAP.active;
