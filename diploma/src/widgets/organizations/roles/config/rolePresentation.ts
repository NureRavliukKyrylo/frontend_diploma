import type { ContextRoleDto } from "@entities/organization";

export type ContextRoleCardType = "system" | "template" | "custom";

type PermissionGroup = {
  title: string;
  permissions: string[];
};

const stripePalette = [
  "#8b0000",
  "#1a1a1a",
  "#1a7a45",
  "#0f3460",
  "#c07000",
  "#5a3090",
] as const;

export const permissionLabels: Record<string, string> = {
  "organization.content_manage": "Manage organization content",
  "organization.members_manage": "Manage members",
  "organization.roles_manage": "Manage roles",
  "organization.roles_assign": "Assign roles",
  "project.content_manage": "Manage projects",
  "project.members_manage": "Manage project members",
  "project.roles_manage": "Manage project roles",
  "project.roles_assign": "Assign project roles",
  "event.content_manage": "Manage events",
  "event.members_manage": "Manage event members",
  "event.roles_manage": "Manage event roles",
  "event.roles_assign": "Assign event roles",
  "task.content_manage": "Manage tasks",
  "task.members_manage": "Manage task members",
  "task.roles_manage": "Manage task roles",
  "task.roles_assign": "Assign task roles",
  "task.timelog_view_all": "View all time logs",
  "task.timelog_edit_manager": "Edit time logs (manager)",
  "task.timelog_approve": "Approve time logs",
  "task.timelog_reject": "Reject time logs",
  "task.timelog_resolve_dispute": "Resolve time log disputes",
  "attendance.view_event": "View event attendance",
  "attendance.approve_event": "Approve attendance",
  "attendance.reject_event": "Reject attendance",
  "attendance.resolve_dispute": "Resolve attendance disputes",
  "attendance.export_event": "Export attendance",
  "participation.view_members": "View member list",
  "participation.view_history": "View participation history",
  "participation.join_for_user": "Add members manually",
  "participation.leave_for_user": "Remove members manually",
  "participation.members_manage": "Manage participation records",
  "participation.roles_assign": "Assign participation roles",
  "timebank.view_user_summary": "View user time bank summary",
};

export const contextRolePermissionGroups: PermissionGroup[] = [
  {
    title: "Organization",
    permissions: [
      "organization.content_manage",
      "organization.members_manage",
      "organization.roles_manage",
      "organization.roles_assign",
    ],
  },
  {
    title: "Projects",
    permissions: [
      "project.content_manage",
      "project.members_manage",
      "project.roles_manage",
      "project.roles_assign",
    ],
  },
  {
    title: "Events",
    permissions: [
      "event.content_manage",
      "event.members_manage",
      "event.roles_manage",
      "event.roles_assign",
      "attendance.view_event",
      "attendance.approve_event",
      "attendance.reject_event",
      "attendance.resolve_dispute",
      "attendance.export_event",
    ],
  },
  {
    title: "Tasks",
    permissions: [
      "task.content_manage",
      "task.members_manage",
      "task.roles_manage",
      "task.roles_assign",
      "task.timelog_view_all",
      "task.timelog_edit_manager",
      "task.timelog_approve",
      "task.timelog_reject",
      "task.timelog_resolve_dispute",
    ],
  },
  {
    title: "Participation",
    permissions: [
      "participation.view_members",
      "participation.view_history",
      "participation.join_for_user",
      "participation.leave_for_user",
      "participation.members_manage",
      "participation.roles_assign",
    ],
  },
  {
    title: "Time Bank",
    permissions: ["timebank.view_user_summary"],
  },
];

const humanizePermissionCode = (code: string) =>
  code
    .split(".")
    .join(" ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const getPermissionLabel = (code: string) =>
  permissionLabels[code] ?? humanizePermissionCode(code);

export const getRoleStripeColor = (index: number) =>
  stripePalette[index] ?? "#888888";

export const getRoleAccentColor = (index: number) =>
  stripePalette[index] ?? "#888888";

export const getRoleIndexLabel = (
  type: ContextRoleCardType,
  index: number,
) => {
  const sequence = String(index + 1).padStart(2, "0");

  if (type === "system") return sequence;
  if (type === "template") return `T${index + 1}`;
  return `C${index + 1}`;
};

export const getRoleTypeLabel = (
  type: ContextRoleCardType,
  role: ContextRoleDto,
) => {
  if (role.archivedAt) return "Archived role";
  if (type === "system") return "System role";
  if (type === "template") return "Template role";
  return "Custom role";
};
