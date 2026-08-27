import type { TabOption } from "@shared/config/types";
import type { MyActivitiesMode } from "./MyActivitiesMode";
import type { TFunction } from "i18next";

export const getMyActivitiesTab = (
  t: TFunction,
): TabOption<MyActivitiesMode>[] => [
  { label: t("tabs.projects"), value: "projects" },
  { label: t("tabs.events"), value: "events" },
  { label: t("tabs.tasks"), value: "tasks" },
];
