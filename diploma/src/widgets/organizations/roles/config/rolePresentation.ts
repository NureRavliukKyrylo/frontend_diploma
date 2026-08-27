import type { ContextRoleDto } from "@entities/organization";
import type { TFunction } from "i18next";

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
  "organization.content_manage":
    "roles:permissions.labels.organizationContentManage",
  "organization.members_manage":
    "roles:permissions.labels.organizationMembersManage",
  "organization.roles_manage":
    "roles:permissions.labels.organizationRolesManage",
  "organization.roles_assign":
    "roles:permissions.labels.organizationRolesAssign",
  "project.content_manage": "roles:permissions.labels.projectContentManage",
  "project.members_manage": "roles:permissions.labels.projectMembersManage",
  "project.roles_manage": "roles:permissions.labels.projectRolesManage",
  "project.roles_assign": "roles:permissions.labels.projectRolesAssign",
  "event.content_manage": "roles:permissions.labels.eventContentManage",
  "event.members_manage": "roles:permissions.labels.eventMembersManage",
  "event.roles_manage": "roles:permissions.labels.eventRolesManage",
  "event.roles_assign": "roles:permissions.labels.eventRolesAssign",
  "task.content_manage": "roles:permissions.labels.taskContentManage",
  "task.members_manage": "roles:permissions.labels.taskMembersManage",
  "task.roles_manage": "roles:permissions.labels.taskRolesManage",
  "task.roles_assign": "roles:permissions.labels.taskRolesAssign",
  "task.timelog_view_all": "roles:permissions.labels.taskTimelogViewAll",
  "task.timelog_edit_manager":
    "roles:permissions.labels.taskTimelogEditManager",
  "task.timelog_approve": "roles:permissions.labels.taskTimelogApprove",
  "task.timelog_reject": "roles:permissions.labels.taskTimelogReject",
  "task.timelog_resolve_dispute":
    "roles:permissions.labels.taskTimelogResolveDispute",
  "attendance.view_event": "roles:permissions.labels.attendanceViewEvent",
  "attendance.approve_event": "roles:permissions.labels.attendanceApproveEvent",
  "attendance.reject_event": "roles:permissions.labels.attendanceRejectEvent",
  "attendance.resolve_dispute":
    "roles:permissions.labels.attendanceResolveDispute",
  "attendance.export_event": "roles:permissions.labels.attendanceExportEvent",
  "participation.view_members":
    "roles:permissions.labels.participationViewMembers",
  "participation.view_history":
    "roles:permissions.labels.participationViewHistory",
  "participation.join_for_user":
    "roles:permissions.labels.participationJoinForUser",
  "participation.leave_for_user":
    "roles:permissions.labels.participationLeaveForUser",
  "participation.members_manage":
    "roles:permissions.labels.participationMembersManage",
  "participation.roles_assign":
    "roles:permissions.labels.participationRolesAssign",
  "timebank.view_user_summary":
    "roles:permissions.labels.timebankViewUserSummary",
};

export const contextRolePermissionGroups: PermissionGroup[] = [
  {
    title: "roles:permissions.groups.organization",
    permissions: [
      "organization.content_manage",
      "organization.members_manage",
      "organization.roles_manage",
      "organization.roles_assign",
    ],
  },
  {
    title: "roles:permissions.groups.projects",
    permissions: [
      "project.content_manage",
      "project.members_manage",
      "project.roles_manage",
      "project.roles_assign",
    ],
  },
  {
    title: "roles:permissions.groups.events",
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
    title: "roles:permissions.groups.tasks",
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
    title: "roles:permissions.groups.participation",
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
    title: "roles:permissions.groups.timeBank",
    permissions: ["timebank.view_user_summary"],
  },
];

const humanizePermissionCode = (code: string) =>
  code
    .split(".")
    .join(" ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const getPermissionLabel = (code: string, t: TFunction) => {
  const key = permissionLabels[code];
  return key ? t(key) : humanizePermissionCode(code);
};

export const getRoleStripeColor = (index: number) =>
  stripePalette[index] ?? "#888888";

export const getRoleAccentColor = (index: number) =>
  stripePalette[index] ?? "#888888";

export const getRoleIndexLabel = (type: ContextRoleCardType, index: number) => {
  const sequence = String(index + 1).padStart(2, "0");

  if (type === "system") return sequence;
  if (type === "template") return `T${index + 1}`;
  return `C${index + 1}`;
};

export const getRoleTypeLabel = (
  type: ContextRoleCardType,
  role: ContextRoleDto,
  t: TFunction,
) => {
  if (role.archivedAt) return t("roles:types.archived");
  if (type === "system") return t("roles:types.system");
  if (type === "template") return t("roles:types.template");
  return t("roles:types.custom");
};
