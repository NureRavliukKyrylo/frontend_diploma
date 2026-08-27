import type { SortOption } from "@shared/config/types";
import type { TFunction } from "i18next";

export const getOnlineOptions = (
  t: TFunction,
): SortOption<"all" | "online" | "offline">[] => [
  { label: t("filters.onlineOptions.all"), value: "all" },
  { label: t("status.online"), value: "online" },
  { label: t("status.offline"), value: "offline" },
];
