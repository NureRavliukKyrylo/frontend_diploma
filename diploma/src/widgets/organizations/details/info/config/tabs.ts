import type { TabOption } from "@shared/config/types";

export type OrganizationDetailsTab =
  | "overview"
  | "projects"
  | "events"
  | "tasks"
  | "feedback";

export const organizationDetailsTabs: TabOption<OrganizationDetailsTab>[] = [
  { label: "details.tabs.overview", value: "overview" },
  { label: "details.tabs.projects", value: "projects" },
  { label: "details.tabs.events", value: "events" },
  { label: "details.tabs.tasks", value: "tasks" },
  { label: "details.tabs.feedback", value: "feedback" },
];
