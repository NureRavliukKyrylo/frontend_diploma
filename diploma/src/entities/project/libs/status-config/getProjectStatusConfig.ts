type StatusConfig = { label: string; bg: string; color: string };

const STATUS_MAP: Record<string, StatusConfig> = {
  active: { label: "Active", bg: "#eaf3de", color: "#3b6d11" },
  endingSoon: { label: "Ending soon", bg: "#faeeda", color: "#854f0b" },
  completed: { label: "Completed", bg: "#e6f1fb", color: "#185fa5" },
  archived: { label: "Archived", bg: "#f1efe8", color: "#5f5e5a" },
};

export const getProjectStatusConfig = (state: string): StatusConfig =>
  STATUS_MAP[state] ?? STATUS_MAP.active;
