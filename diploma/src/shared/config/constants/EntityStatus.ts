import type { EntityStatus, StatusConfig } from "../types";

export const ENTITY_STATUS_MAP: Record<
  EntityStatus,
  StatusConfig & { key: string }
> = {
  active: {
    key: "active",
    label: "Active",
    bg: "#eaf3de",
    color: "#3b6d11",
    shadow: "rgba(59, 109, 17, 0.25)",
  },
  endingSoon: {
    key: "endingSoon",
    label: "Ending soon",
    bg: "#faeeda",
    color: "#854f0b",
    shadow: "rgba(133, 79, 11, 0.25)",
  },
  completed: {
    key: "completed",
    label: "Completed",
    bg: "#e6f1fb",
    color: "#185fa5",
    shadow: "rgba(24, 95, 165, 0.25)",
  },
  archived: {
    key: "archived",
    label: "Archived",
    bg: "#f1efe8",
    color: "#5f5e5a",
    shadow: "rgba(95, 94, 90, 0.2)",
  },
};
