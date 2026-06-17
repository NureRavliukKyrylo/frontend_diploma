import type { TabOption } from "@shared/config/types";
import type { ProjectJoinedMode } from "@entities/project";
import type { TFunction } from "i18next";

export const getJoinedProjectMainTabs = (
  t: TFunction,
): TabOption<ProjectJoinedMode>[] => [
  {
    label: t("project:navigation.overview", { defaultValue: "OVERVIEW" }),
    value: "overview",
  },
  {
    label: t("project:navigation.tasks", { defaultValue: "TASKS" }),
    value: "tasks",
  },
  {
    label: t("project:navigation.feedback", { defaultValue: "FEEDBACK" }),
    value: "feedback",
  },
];
