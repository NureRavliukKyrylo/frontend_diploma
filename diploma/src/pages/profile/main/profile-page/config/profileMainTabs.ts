import type { TFunction } from "i18next";
import type { TabOption } from "@shared/config/types";
import type { ProfileMode } from "@entities/user";

export const getProfileMainTabs = (t: TFunction): TabOption<ProfileMode>[] => [
  { label: t("tabs.profile"), value: "profile" },
  { label: t("tabs.statistics"), value: "statistics" },
  { label: t("tabs.skills"), value: "skills" },
  { label: t("tabs.inventory"), value: "inventory" },
];
