import type { OrganizationContextRole } from "@entities/organization";
import type { ParticipationListItem } from "@entities/participation";
import type { User } from "@entities/user/profile";
import type { TFunction } from "i18next";

export const getOrganizationInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "IF";

const isContextRole = (
  role: OrganizationContextRole,
  entityType: string,
  entityId: string,
) => role.entityType === entityType && role.entityId === entityId;

const getRoleStatus = (role: OrganizationContextRole) =>
  role.archivedAt ? "archived" : role.isActive ? "active" : "inactive";

export const groupContextRoles = (
  activeRoles: OrganizationContextRole[],
  allRoles: OrganizationContextRole[],
  entityType: string,
  entityId: string,
) => {
  const scopedActive = activeRoles.filter((role) =>
    isContextRole(role, entityType, entityId),
  );
  const scopedAll = allRoles.filter((role) =>
    isContextRole(role, entityType, entityId),
  );

  return {
    allScopedRoles: scopedAll,
    activeScopedRoles: scopedActive,
    systemRoles: scopedActive.filter(
      (role) => role.isSystemGenerated && getRoleStatus(role) === "active",
    ),
    customRoles: scopedActive.filter(
      (role) =>
        !role.isSystemGenerated &&
        !role.isTemplate &&
        getRoleStatus(role) === "active",
    ),
    archivedRoles: scopedAll.filter((role) => Boolean(role.archivedAt)),
  };
};

export const groupOrganizationRoles = (
  activeRoles: OrganizationContextRole[],
  allRoles: OrganizationContextRole[],
  organizationId: string,
) =>
  groupContextRoles(
    activeRoles,
    allRoles,
    "organization",
    organizationId,
  );

export const buildMembersByRoleId = (members: ParticipationListItem[]) => {
  const map = new Map<string, ParticipationListItem[]>();

  members.forEach((member) => {
    const roleId = member.role?.roleId;
    if (!roleId) return;
    map.set(roleId, [...(map.get(roleId) ?? []), member]);
  });

  return map;
};

const getJoinedLabel = (
  member: ParticipationListItem,
  t: TFunction,
  language: string,
) => {
  const joinedAt = [...(member.joinDates ?? [])]
    .sort((left, right) => new Date(left).getTime() - new Date(right).getTime())
    .at(0);
  if (!joinedAt) return t("roles:members.joinUnavailable");
  const date = new Date(joinedAt);
  if (Number.isNaN(date.getTime())) {
    return t("roles:members.joinUnavailable");
  }
  return t("roles:members.joined", {
    date: date.toLocaleDateString(language === "uk" ? "uk-UA" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  });
};

export const buildRoleMembers = (
  members: ParticipationListItem[],
  profilesByUserId: Map<string, User | null>,
  t: TFunction,
  language: string,
) =>
  members.map((member) => {
    const profile = profilesByUserId.get(member.userId);
    const fullName =
      [member.firstName, member.lastName].filter(Boolean).join(" ").trim() ||
      [profile?.firstName, profile?.lastName]
        .filter(Boolean)
        .join(" ")
        .trim() ||
      t("roles:members.teamMember");

    return {
      id: member.id,
      userId: member.userId,
      fullName,
      avatarUrl: member.avatarUrl || profile?.profile?.avatarUrl || null,
      joinedLabel: getJoinedLabel(member, t, language),
      level: profile?.progress?.level ?? null,
    };
  });
