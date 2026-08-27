import type { TabOption } from "@shared/config/types";
import type { EventMode } from "@entities/event";
import type { TFunction } from "i18next";

export const getEventMainTabs = (t: TFunction): TabOption<EventMode>[] => [
  {
    label: t("event:tabs.overview", { defaultValue: "OVERVIEW" }),
    value: "overview",
  },
  {
    label: t("event:tabs.tasks", { defaultValue: "TASKS" }),
    value: "tasks",
  },
  {
    label: t("event:tabs.members", { defaultValue: "MEMBERS" }),
    value: "members",
  },
  {
    label: t("event:tabs.feedback", { defaultValue: "FEEDBACK" }),
    value: "feedback",
  },
];
