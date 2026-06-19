export type ActiveTab = "general" | "access" | "attendance" | "danger";

export const tabs: Array<{ id: ActiveTab; label: string }> = [
  { id: "general", label: "General" },
  { id: "access", label: "Access" },
  { id: "attendance", label: "Attendance" },
  { id: "danger", label: "Danger zone" },
];

export const statusLabels = {
  active: "Active",
  endingSoon: "Ending soon",
  completed: "Completed",
  archived: "Archived",
  cancelled: "Cancelled",
};
