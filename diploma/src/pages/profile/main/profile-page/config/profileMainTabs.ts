import type { TabOption } from "@shared/config/types";
import { type ProfileMode } from "@entities/user";

export const profileMainTabs: TabOption<ProfileMode>[] = [
  { label: "PROFILE", value: "profile" },
  { label: "STATISTICS", value: "statistics" },
  { label: "SKILLS", value: "skills" },
  { label: "INVENTORY", value: "inventory" },
];
