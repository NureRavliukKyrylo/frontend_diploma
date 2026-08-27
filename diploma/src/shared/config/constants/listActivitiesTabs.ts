import type { ListActivitiesMode, TabOption } from "@shared/config/types";
import type { TFunction } from "i18next";

export const getListActivitiesTabs = (
  t: TFunction,
): TabOption<ListActivitiesMode>[] => [
  { label: t("tabs.projects"), value: "projects" },
  { label: t("tabs.events"), value: "events" },
  { label: t("tabs.tasks"), value: "tasks" },
];
