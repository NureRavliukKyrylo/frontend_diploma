export type SettingsTab = "general" | "access" | "danger";

export const tabs: Array<{ labelKey: string; value: SettingsTab }> = [
  { labelKey: "settings.tabs.general", value: "general" },
  { labelKey: "settings.tabs.access", value: "access" },
  { labelKey: "settings.tabs.danger", value: "danger" },
];
