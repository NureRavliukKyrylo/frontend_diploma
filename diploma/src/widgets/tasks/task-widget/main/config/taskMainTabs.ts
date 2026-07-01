import type { TabOption } from "@shared/config/types";
import type { Task, TaskMode } from "@entities/task";
import type { TFunction } from "i18next";
import { canViewTaskTimeLogs } from "../lib/canManageTask";

export const getTaskMainTabs = (
  t: TFunction,
  task?: Task,
): TabOption<TaskMode>[] => {
  const tabs: TabOption<TaskMode>[] = [
    {
      label: t("task:tabs.overview", { defaultValue: "OVERVIEW" }),
      value: "overview",
    },
    {
      label: t("task:tabs.comments", { defaultValue: "COMMENTS" }),
      value: "comments",
    },
    {
      label: t("task:tabs.members", { defaultValue: "MEMBERS" }),
      value: "members",
    },
    {
      label: t("task:tabs.feedback", { defaultValue: "FEEDBACK" }),
      value: "feedbacks",
    },
  ];

  if (canViewTaskTimeLogs(task)) {
    tabs.push({
      label: t("task:tabs.timelog", { defaultValue: "WORK LOG" }),
      value: "timelog",
    });
  }

  return tabs;
};
