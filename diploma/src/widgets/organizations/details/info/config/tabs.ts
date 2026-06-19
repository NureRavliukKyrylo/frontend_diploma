import type { TabOption } from "@shared/config/types";

export type OrganizationDetailsTab =
  | "overview"
  | "projects"
  | "events"
  | "tasks"
  | "feedback";

export const organizationDetailsTabs: TabOption<OrganizationDetailsTab>[] = [
  { label: "OVERVIEW", value: "overview" },
  { label: "PROJECTS", value: "projects" },
  { label: "EVENTS", value: "events" },
  { label: "TASKS", value: "tasks" },
  { label: "FEEDBACK", value: "feedback" },
];
