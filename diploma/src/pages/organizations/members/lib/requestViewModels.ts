import type { OrganizationPendingRequest } from "@entities/organization";
import type { ParticipationListItem } from "@entities/participation";
import type { User } from "@entities/user/profile";
import type { OrganizationRequestCardModel } from "@widgets/organizations/members";
import {
  getFullName,
  getRatingCount,
  getRatingValue,
} from "./memberViewModels";

const formatCompactCount = (value?: number | null) =>
  typeof value === "number" ? String(value) : "—";

export type OrganizationRequestTab = "join" | "leave";

export const buildRequestCards = (
  requests: OrganizationPendingRequest[],
  kind: OrganizationRequestTab,
  membersByUserId: Map<string, ParticipationListItem>,
  userById: Map<string, User | null>,
): OrganizationRequestCardModel[] =>
  requests.map((request) => {
    const user = userById.get(request.userId);
    const member = membersByUserId.get(request.userId);

    return {
      id: request.id,
      userId: request.userId,
      kind,
      fullName: getFullName(
        member?.firstName ?? user?.firstName,
        member?.lastName ?? user?.lastName,
        request.title || "Team member",
      ),
      avatarUrl: member?.avatarUrl ?? user?.profile?.avatarUrl ?? null,
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
      submittedAt: request.createdAt,
    };
  });
