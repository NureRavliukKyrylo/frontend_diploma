import type { TabOption } from "@shared/config/types";
import type { EventJoinedMode } from "@entities/event";
import type { TFunction } from "i18next";

export const getEventJoinedMainTabs = (
  t: TFunction,
): TabOption<EventJoinedMode>[] => [
  {
    label: t("event:tabs.overview", { defaultValue: "OVERVIEW" }),
    value: "overview",
  },
  {
    label: t("event:tabs.attendance", { defaultValue: "ATTENDANCE" }),
    value: "attendance",
  },
  {
    label: t("event:tabs.tasks", { defaultValue: "TASKS" }),
    value: "tasks",
  },
  {
    label: t("event:tabs.feedback", { defaultValue: "FEEDBACK" }),
    value: "feedback",
  },
];
