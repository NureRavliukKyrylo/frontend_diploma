import type { TFunction } from "i18next";
import type { ParticipationListItem } from "@entities/participation";
import type { User } from "@entities/user/profile";
import type { EntityType } from "@shared/config/types";
import type { OrganizationMemberCardModel } from "@widgets/organizations/members";

const formatCompactCount = (value?: number | null) =>
  typeof value === "number" ? String(value) : "\u2014";

const formatJoinedLabel = (
  value: string | null | undefined,
  t: TFunction,
  locale: string,
) => {
  if (!value) return t("member.joinDateUnavailable");

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return t("member.joinDateUnavailable");
  }

  const intlLocale = locale === "uk" || locale === "ua" ? "uk-UA" : "en-US";
  const formattedDate = date.toLocaleDateString(intlLocale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return t("member.joinedDate", { date: formattedDate });
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
  entityType: EntityType;
  entityId: string;
  ownerId?: string | null;
  createdAt?: string | null;
  userById: Map<string, User | null>;
  currentUser?: User;
  currentUserId: string | null;
  ownerLabel: string;
}

export const buildMembersByUserId = ({
  rawMembers,
  entityType,
  entityId,
  ownerId,
  createdAt,
  userById,
  currentUser,
  currentUserId,
  ownerLabel,
}: BuildMembersMapParams) => {
  const membersByUserId = new Map<string, ParticipationListItem>();

  rawMembers.forEach((member) => membersByUserId.set(member.userId, member));

  if (!ownerId || membersByUserId.has(ownerId)) {
    return membersByUserId;
  }

  const ownerProfile = userById.get(ownerId);
  const fallback = currentUserId === ownerId ? currentUser : ownerProfile;

  membersByUserId.set(ownerId, {
    id: `owner-${ownerId}`,
    entityType,
    entityId,
    userId: ownerId,
    firstName: ownerProfile?.firstName ?? fallback?.firstName ?? ownerLabel,
    lastName: ownerProfile?.lastName ?? fallback?.lastName ?? "",
    avatarUrl:
      ownerProfile?.profile?.avatarUrl ?? fallback?.profile?.avatarUrl ?? "",
    role: { roleId: "owner", name: ownerLabel },
    isActive: true,
    joinDates: createdAt ? [createdAt] : [],
  });

  return membersByUserId;
};

export const buildMemberCards = (
  membersByUserId: Map<string, ParticipationListItem>,
  userById: Map<string, User | null>,
  ownerId: string | null | undefined,
  t: TFunction,
  locale: string,
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
          getFullName(
            user?.firstName,
            user?.lastName,
            t("member.teamMember"),
          ),
        ),
        avatarUrl: member.avatarUrl || user?.profile?.avatarUrl || null,
        isOwner,
        roleId: member.role?.roleId ?? null,
        roleName: isOwner
          ? t("member.ownerLabel")
          : member.role?.name || t("member.volunteerLabel"),
        level: user?.progress?.level ?? null,
        rating: getRatingValue(user?.rating),
        ratingCount: getRatingCount(user?.rating),
        totalHours: null,
        primaryStatValue: formatCompactCount(
          user?.profile?.completedProjectCount,
        ),
        primaryStatLabel: t("member.completedProjects"),
        secondaryStatValue: formatCompactCount(
          user?.profile?.activeProjectCount,
        ),
        secondaryStatLabel: t("member.activeProjects"),
        joinedAtLabel: formatJoinedLabel(
          getEarliestJoinDate(member),
          t,
          locale,
        ),
      };
    });
