export type ActiveTab = "general" | "access" | "attendance" | "danger";

export const tabs: Array<{ id: ActiveTab; labelKey: string }> = [
  { id: "general", labelKey: "settings.tabs.general" },
  { id: "access", labelKey: "settings.tabs.access" },
  { id: "attendance", labelKey: "settings.tabs.attendance" },
  { id: "danger", labelKey: "settings.tabs.danger" },
];

export const statusLabels = {
  active: "settings.sidebar.statuses.active",
  endingSoon: "settings.sidebar.statuses.endingSoon",
  completed: "settings.sidebar.statuses.completed",
  archived: "settings.sidebar.statuses.archived",
  cancelled: "settings.sidebar.statuses.cancelled",
};
