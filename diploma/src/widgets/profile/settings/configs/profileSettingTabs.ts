import type { TabOption } from "@shared/config/types";
import { type ProfileSettingsMode } from "@entities/user";

export const profileSettingsTabs: TabOption<ProfileSettingsMode>[] = [
  { label: "SETTINGS", value: "main" },
  { label: "LINKS", value: "links" },
  { label: "PASSWORD", value: "password" },
];
