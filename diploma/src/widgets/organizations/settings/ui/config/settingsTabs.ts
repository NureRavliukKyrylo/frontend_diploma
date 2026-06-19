export type SettingsTab = "general" | "access" | "danger";

export const tabs: Array<{ label: string; value: SettingsTab }> = [
  { label: "General", value: "general" },
  { label: "Access", value: "access" },
  { label: "Danger zone", value: "danger" },
];
