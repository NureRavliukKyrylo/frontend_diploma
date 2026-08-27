import type {
  ContextRoleCreateDto,
  OrganizationContextRole,
} from "@entities/organization";
import type { RoleActionState } from "../model/types";
import type { TFunction } from "i18next";

export const buildRolePayload = (
  role: OrganizationContextRole,
  overrides: Partial<ContextRoleCreateDto> = {},
): ContextRoleCreateDto => ({
  name: overrides.name ?? role.name,
  description: overrides.description ?? role.description ?? null,
  isTemplate: overrides.isTemplate ?? role.isTemplate,
  templateSourceId: overrides.templateSourceId ?? role.templateSourceId ?? null,
  isSystemGenerated: overrides.isSystemGenerated ?? role.isSystemGenerated,
  isDefaultForJoin: overrides.isDefaultForJoin ?? role.isDefaultForJoin,
  entityType: overrides.entityType ?? role.entityType ?? "organization",
  entityId: overrides.entityId ?? role.entityId ?? null,
  permissions: overrides.permissions ?? role.permissions,
  assignableBy: overrides.assignableBy ?? role.assignableBy,
  approvableBy: overrides.approvableBy ?? role.approvableBy,
  isActive: overrides.isActive ?? role.isActive,
  archivedAt: overrides.archivedAt ?? role.archivedAt ?? null,
  archiveReason:
    overrides.archiveReason ??
    (role.archiveReason === "none" ||
    role.archiveReason === "manual" ||
    role.archiveReason === "no_users" ||
    role.archiveReason === "context_ended"
      ? role.archiveReason
      : null),
});

export const buildRoleActionCopy = (
  state: RoleActionState | null,
  t: TFunction,
) => {
  if (!state) return { title: "", text: "", confirmText: "" };

  if (state.action === "archive") {
    return {
      title: t("roles:confirmation.archiveTitle"),
      text: t("roles:confirmation.archiveText", { name: state.role.name }),
      confirmText: t("roles:confirmation.archive"),
    };
  }

  if (state.action === "restore") {
    return {
      title: t("roles:confirmation.restoreTitle"),
      text: t("roles:confirmation.restoreText", { name: state.role.name }),
      confirmText: t("roles:confirmation.restore"),
    };
  }

  return {
    title: t("roles:confirmation.deleteTitle"),
    text: t("roles:confirmation.deleteText", { name: state.role.name }),
    confirmText: t("roles:confirmation.delete"),
  };
};
