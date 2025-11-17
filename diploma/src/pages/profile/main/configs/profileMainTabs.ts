import type { TabOption } from "@shared/config";
import { type ProfileMode } from "@entities/user";

export const profileMainTabs: TabOption<ProfileMode>[] = [
  { label: "PROFILE", value: "profile" },
  { label: "PROJECTS", value: "projects" },
  { label: "ARCHIVE", value: "archive" },
  { label: "INVENTORY", value: "inventory" },
];
