import type { TabOption } from "@shared/config/types";
import type { TaskJoinedMode } from "@entities/task";
import type { TFunction } from "i18next";

export const getTaskJoinedMainTabs = (
  t: TFunction,
): TabOption<TaskJoinedMode>[] => [
  {
    label: t("task:tabs.comments", { defaultValue: "COMMENTS" }),
    value: "comments",
  },
  {
    label: t("task:tabs.feedback", { defaultValue: "FEEDBACK" }),
    value: "feedback",
  },
];
