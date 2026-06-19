import type { Organization } from "@entities/organization";
import type { ParticipationListItem } from "@entities/participation";
import type { User } from "@entities/user/profile";
import type { OrganizationMemberCardModel } from "@widgets/organizations/members";

const formatCompactCount = (value?: number | null) =>
  typeof value === "number" ? String(value) : "—";
const formatJoinedLabel = (value?: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return `Joined ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
};

export const getFullName = (
  firstName?: string | null,
  lastName?: string | null,
  fallback = "Team member",
) => [firstName, lastName].filter(Boolean).join(" ").trim() || fallback;

const getEarliestJoinDate = (member: ParticipationListItem) => {
  const [joinedAt] = [...(member.joinDates ?? [])].sort(
    (left, right) => new Date(left).getTime() - new Date(right).getTime(),
  );

  return joinedAt ?? null;
};

export const getRatingValue = (rating: unknown) => {
  if (typeof rating === "number" && Number.isFinite(rating)) return rating;

  if (
    typeof rating === "object" &&
    rating !== null &&
    "value" in rating &&
    typeof rating.value === "number" &&
    Number.isFinite(rating.value)
  ) {
    return rating.value;
  }

  return 0;
};

export const getRatingCount = (rating: unknown) => {
  if (
    typeof rating === "object" &&
    rating !== null &&
    "totalVotes" in rating &&
    typeof rating.totalVotes === "number" &&
    Number.isFinite(rating.totalVotes)
  ) {
    return rating.totalVotes;
  }

  return 0;
};

interface BuildMembersMapParams {
  rawMembers: ParticipationListItem[];
  organization?: Organization;
  userById: Map<string, User | null>;
  currentUser?: User;
  currentUserId: string | null;
}

export const buildMembersByUserId = ({
  rawMembers,
  organization,
  userById,
  currentUser,
  currentUserId,
}: BuildMembersMapParams) => {
  const membersByUserId = new Map<string, ParticipationListItem>();

  rawMembers.forEach((member) => membersByUserId.set(member.userId, member));

  if (!organization?.ownerId || membersByUserId.has(organization.ownerId)) {
    return membersByUserId;
  }

  const ownerProfile = userById.get(organization.ownerId);
  const fallback =
    currentUserId === organization.ownerId ? currentUser : ownerProfile;

  membersByUserId.set(organization.ownerId, {
    id: `owner-${organization.ownerId}`,
    entityType: "organization",
    entityId: organization.id,
    userId: organization.ownerId,
    firstName: ownerProfile?.firstName ?? fallback?.firstName ?? "Owner",
    lastName: ownerProfile?.lastName ?? fallback?.lastName ?? "",
    avatarUrl:
      ownerProfile?.profile?.avatarUrl ?? fallback?.profile?.avatarUrl ?? "",
    role: { roleId: "owner", name: "Owner" },
    isActive: true,
    joinDates: organization.createdAt ? [organization.createdAt] : [],
  });

  return membersByUserId;
};

export const buildMemberCards = (
  membersByUserId: Map<string, ParticipationListItem>,
  userById: Map<string, User | null>,
  ownerId?: string | null,
): OrganizationMemberCardModel[] =>
  [...membersByUserId.values()]
    .sort((left, right) => {
      if (left.userId === ownerId && right.userId !== ownerId) return -1;
      if (left.userId !== ownerId && right.userId === ownerId) return 1;
      return getFullName(left.firstName, left.lastName).localeCompare(
        getFullName(right.firstName, right.lastName),
      );
    })
    .map((member) => {
      const user = userById.get(member.userId);
      const isOwner = member.userId === ownerId;

      return {
        userId: member.userId,
        participationId: isOwner ? null : member.id,
        fullName: getFullName(
          member.firstName,
          member.lastName,
          getFullName(user?.firstName, user?.lastName),
        ),
        avatarUrl: member.avatarUrl || user?.profile?.avatarUrl || null,
        isOwner,
        roleId: member.role?.roleId ?? null,
        roleName: isOwner ? "Owner" : member.role?.name || "Volunteer",
        level: user?.progress?.level ?? null,
        rating: getRatingValue(user?.rating),
        ratingCount: getRatingCount(user?.rating),
        totalHours: null,
        primaryStatValue: formatCompactCount(
          user?.profile?.completedProjectCount,
        ),
        primaryStatLabel: "Completed projects",
        secondaryStatValue: formatCompactCount(
          user?.profile?.activeProjectCount,
        ),
        secondaryStatLabel: "Active projects",
        joinedAtLabel: formatJoinedLabel(getEarliestJoinDate(member)),
      };
    });
