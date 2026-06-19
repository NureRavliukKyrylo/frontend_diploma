import type { Organization } from "../model/types";

export interface OrganizationCardMeta {
  level: number | null;
  levelProgress: number;
  categories: string[];
  rating: number | null;
  totalActivities: number;
  activeActivities: number;
  memberCount: number;
  location: string;
}

const resolveRating = (rating: Organization["rating"]): number | null => {
  if (
    typeof rating === "object" &&
    rating !== null &&
    rating.totalVotes !== undefined &&
    Number(rating.totalVotes) <= 0
  ) {
    return null;
  }

  const rawRating =
    typeof rating === "object" && rating !== null ? rating.value : rating;
  const numericRating = Number(rawRating);

  return Number.isFinite(numericRating) && numericRating > 0
    ? numericRating
    : null;
};

const clampPercentage = (value: number): number =>
  Math.min(Math.max(value, 0), 100);

const resolveLocation = (organization: Organization): string => {
  const location = organization.locationInfo;
  const parts = [location?.city, location?.region, location?.country].filter(
    (part): part is string => Boolean(part?.trim()),
  );

  if (parts.length > 0) {
    return Array.from(new Set(parts)).join(", ");
  }

  return location?.address?.trim() || "Location not specified";
};

export const buildOrganizationCardMeta = (
  organization: Organization,
): OrganizationCardMeta => {
  const level =
    typeof organization.level === "number" &&
    Number.isFinite(organization.level)
      ? organization.level
      : null;
  const totalActivities = Math.max(organization.totalActivities ?? 0, 0);
  const activeActivities = Math.max(organization.activeCount ?? 0, 0);
  const explicitProgress = Number(organization.progressPercent);
  const levelProgress = Number.isFinite(explicitProgress)
    ? clampPercentage(explicitProgress)
    : 0;
  return {
    level,
    levelProgress,
    categories: organization.categories ?? [],
    rating: resolveRating(organization.rating),
    totalActivities,
    activeActivities,
    memberCount:
      organization.memberCount ??
      organization.members?.length ??
      organization.memberPreviews?.length ??
      0,
    location: resolveLocation(organization),
  };
};
