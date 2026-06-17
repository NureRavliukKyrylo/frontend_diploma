import type { TabOption } from "@shared/config/types";
import type { ProjectMode } from "@entities/project";
import type { TFunction } from "i18next";

export const getProjectMainTabs = (t: TFunction): TabOption<ProjectMode>[] => [
  {
    label: t("project:navigation.overview", { defaultValue: "OVERVIEW" }),
    value: "overview",
  },
  {
    label: t("project:navigation.events", { defaultValue: "EVENTS" }),
    value: "events",
  },
  {
    label: t("project:navigation.tasks", { defaultValue: "TASKS" }),
    value: "tasks",
  },
  {
    label: t("project:navigation.members", { defaultValue: "MEMBERS" }),
    value: "members",
  },
  {
    label: t("project:navigation.feedback", { defaultValue: "FEEDBACK" }),
    value: "feedback",
  },
];
