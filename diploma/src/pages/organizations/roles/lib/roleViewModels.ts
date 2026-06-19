import type { OrganizationContextRole } from "@entities/organization";
import type { ParticipationListItem } from "@entities/participation";
import type { User } from "@entities/user/profile";

export const getOrganizationInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "IF";

const isOrganizationRole = (
  role: OrganizationContextRole,
  organizationId: string,
) => role.entityType === "organization" && role.entityId === organizationId;

const getRoleStatus = (role: OrganizationContextRole) =>
  role.archivedAt ? "archived" : role.isActive ? "active" : "inactive";

export const groupOrganizationRoles = (
  activeRoles: OrganizationContextRole[],
  allRoles: OrganizationContextRole[],
  organizationId: string,
) => {
  const scopedActive = activeRoles.filter((role) =>
    isOrganizationRole(role, organizationId),
  );
  const scopedAll = allRoles.filter((role) =>
    isOrganizationRole(role, organizationId),
  );

  return {
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

export const buildMembersByRoleId = (members: ParticipationListItem[]) => {
  const map = new Map<string, ParticipationListItem[]>();

  members.forEach((member) => {
    const roleId = member.role?.roleId;
    if (!roleId) return;
    map.set(roleId, [...(map.get(roleId) ?? []), member]);
  });

  return map;
};

const getJoinedLabel = (member: ParticipationListItem) => {
  const joinedAt = [...(member.joinDates ?? [])]
    .sort((left, right) => new Date(left).getTime() - new Date(right).getTime())
    .at(0);
  if (!joinedAt) return "Join date unavailable";
  const date = new Date(joinedAt);
  if (Number.isNaN(date.getTime())) return "Join date unavailable";
  return `Joined ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
};

export const buildRoleMembers = (
  members: ParticipationListItem[],
  profilesByUserId: Map<string, User | null>,
) =>
  members.map((member) => {
    const profile = profilesByUserId.get(member.userId);
    const fullName =
      [member.firstName, member.lastName].filter(Boolean).join(" ").trim() ||
      [profile?.firstName, profile?.lastName]
        .filter(Boolean)
        .join(" ")
        .trim() ||
      "Team member";

    return {
      id: member.id,
      userId: member.userId,
      fullName,
      avatarUrl: member.avatarUrl || profile?.profile?.avatarUrl || null,
      joinedLabel: getJoinedLabel(member),
      level: profile?.progress?.level ?? null,
    };
  });
