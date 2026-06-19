export type ActiveTab = "general" | "access" | "danger";

export const tabs: Array<{ id: ActiveTab; label: string }> = [
  { id: "general", label: "General" },
  { id: "access", label: "Access" },
  { id: "danger", label: "Danger zone" },
];
