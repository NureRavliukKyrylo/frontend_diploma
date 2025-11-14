import type { TabOption } from "@shared/config";
import type { SettingsMode } from "./profileSettingForms";

export const profileSettingsTabs: TabOption<SettingsMode>[] = [
  { label: "SETTINGS", value: "main" },
  { label: "LINKS", value: "links" },
  { label: "PASSWORD", value: "password" },
];
