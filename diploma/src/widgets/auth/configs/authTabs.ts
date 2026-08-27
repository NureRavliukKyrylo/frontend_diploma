import type { TFunction } from "i18next";
import type { TabOption } from "@shared/config/types";
import type { AuthMode } from "@entities/user";

export const getAuthTabs = (t: TFunction): TabOption<AuthMode>[] => [
  { label: t("common.signIn"), value: "signin" },
  { label: t("common.signUp"), value: "signup" },
];
