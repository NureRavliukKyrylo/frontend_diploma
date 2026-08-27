import type { SortOption } from "@shared/config/types";
import type { NotificationType } from "../model";
import { notificationTypeValues } from "../libs/notificationSearchSchema";
import type { TFunction } from "i18next";

export const getNotificationTypeOptions = (
  t: TFunction,
): SortOption<NotificationType | "All">[] => [
  {
    label: t("notification:types.All"),
    value: "All",
  },
  ...notificationTypeValues.map((value) => ({
    label: t(`notification:types.${value}`, { defaultValue: value }),
    value,
  })),
];
