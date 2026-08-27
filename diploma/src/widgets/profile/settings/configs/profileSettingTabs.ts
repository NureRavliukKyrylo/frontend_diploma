import type { TFunction } from "i18next";
import type { TabOption } from "@shared/config/types";
import type { ProfileSettingsMode } from "@entities/user";

export const getProfileSettingsTabs = (
  t: TFunction,
): TabOption<ProfileSettingsMode>[] => [
  { label: t("settings.tabs.settings"), value: "settings" },
  { label: t("settings.tabs.links"), value: "links" },
  { label: t("settings.tabs.security"), value: "security" },
];
