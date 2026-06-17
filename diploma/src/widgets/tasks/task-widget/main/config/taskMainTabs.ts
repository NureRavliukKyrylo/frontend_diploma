import type { TabOption } from "@shared/config/types";
import type { TaskMode } from "@entities/task";
import type { TFunction } from "i18next";

export const getTaskMainTabs = (t: TFunction): TabOption<TaskMode>[] => [
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
