import type {
  Organization,
  OrganizationCategoryStats,
  OrganizationMember,
  OrganizationSocialLink,
} from "../model/types";
import {
  normalizeOrganizationMember,
  normalizeOrganizationMemberPreview,
} from "./normalizeOrganizationMembers";
import {
  normalizeCategoryStats,
  normalizeSocialLink,
} from "./normalizeOrganizationParts";
import type { RawOrganization } from "./normalizeOrganizationTypes";
import { pickFiniteNumber, pickString } from "./normalizeOrganizationValues";

export { normalizeOrganizationMember } from "./normalizeOrganizationMembers";

export const normalizeOrganization = (
  rawValue: unknown,
): Organization | null => {
  if (typeof rawValue !== "object" || rawValue === null) return null;

  const raw = rawValue as RawOrganization;
  const id = pickString(raw.id, raw.Id);
  const name = pickString(raw.name, raw.Name);

  if (!id || !name) return null;

  const rawCategories = raw.categories ?? raw.Categories;
  const rawCategoryArray = Array.isArray(rawCategories) ? rawCategories : [];
  const categoryNames = rawCategoryArray
    .filter((value): value is string => typeof value === "string")
    .filter(Boolean);
  const categoryStats = rawCategoryArray
    .map(normalizeCategoryStats)
    .filter((value): value is OrganizationCategoryStats => value !== null);
  const statsCategoryNames = categoryStats
    .map((category) => category.name)
    .filter(Boolean);
  const normalizedCategories = Array.from(
    new Set([...categoryNames, ...statsCategoryNames]),
  );
  const rawSocialLinks = raw.socialLinks ?? raw.SocialLinks;
  const socialLinks = Array.isArray(rawSocialLinks)
    ? rawSocialLinks
        .map(normalizeSocialLink)
        .filter((value): value is OrganizationSocialLink => value !== null)
    : [];
  const rawMembers =
    raw.members ?? raw.Members ?? raw.teamMembers ?? raw.TeamMembers;
  const normalizedMembers = Array.isArray(rawMembers)
    ? rawMembers
        .map(normalizeOrganizationMember)
        .filter((value): value is OrganizationMember => value !== null)
    : [];
  const normalizedOwner = normalizeOrganizationMember(raw.owner ?? raw.Owner);
  const members = normalizedOwner
    ? [
        normalizedOwner,
        ...normalizedMembers.filter((member) => member.id !== normalizedOwner.id),
      ]
    : normalizedMembers;
  const rawMemberPreviews = raw.memberPreviews ?? raw.MemberPreviews;
  const memberPreviews = Array.isArray(rawMemberPreviews)
    ? rawMemberPreviews
        .map(normalizeOrganizationMemberPreview)
        .filter(
          (
            member,
          ): member is NonNullable<Organization["memberPreviews"]>[number] =>
            member !== null,
        )
    : [];
  const rawProgress =
    typeof raw.progress === "object" && raw.progress !== null
      ? (raw.progress as Record<string, unknown>)
      : typeof raw.Progress === "object" && raw.Progress !== null
        ? (raw.Progress as Record<string, unknown>)
        : {};

  return {
    id,
    name,
    description: pickString(raw.description, raw.Description),
    ownerId: pickString(raw.ownerId, raw.OwnerId),
    createdAt: pickString(raw.createdAt, raw.CreatedAt),
    launchDate: raw.launchDate ?? raw.LaunchDate ?? raw.StartAt ?? undefined,
    logoUrl: raw.logoUrl ?? raw.LogoUrl ?? undefined,
    contactEmail: pickString(raw.contactEmail, raw.ContactEmail),
    website: pickString(raw.website, raw.Website),
    phoneNumber: raw.phoneNumber ?? raw.PhoneNumber ?? undefined,
    locationInfo: raw.locationInfo ?? raw.LocationInfo ?? undefined,
    joinPolicy: pickString(raw.joinPolicy, raw.JoinPolicy),
    leavePolicy: pickString(raw.leavePolicy, raw.LeavePolicy),
    socialLinks: socialLinks.length > 0 ? socialLinks : undefined,
    isArchived: raw.isArchived ?? raw.IsArchived ?? undefined,
    categories: normalizedCategories.length > 0 ? normalizedCategories : undefined,
    categoryStats: categoryStats.length > 0 ? categoryStats : undefined,
    members: members.length > 0 ? members : undefined,
    memberCount: pickFiniteNumber(
      raw.memberCount,
      raw.MemberCount,
      raw.membersCount,
      raw.MembersCount,
    ),
    memberPreviews:
      memberPreviews.length > 0 ? memberPreviews : raw.memberPreviews,
    rating: raw.rating ?? raw.Rating ?? undefined,
    totalActivities: pickFiniteNumber(
      raw.totalActivities,
      raw.TotalActivities,
    ),
    activeCount: pickFiniteNumber(raw.activeCount, raw.ActiveCount),
    currentProgress: pickFiniteNumber(
      raw.currentProgress,
      raw.CurrentProgress,
      rawProgress.currentProgress,
      rawProgress.CurrentProgress,
    ),
    progressPercent: pickFiniteNumber(
      raw.progressPercent,
      rawProgress.percent,
      rawProgress.Percent,
    ),
    maxProgress: pickFiniteNumber(
      raw.maxProgress,
      rawProgress.maxProgress,
      rawProgress.MaxProgress,
    ),
    totalTasks: raw.totalTasks ?? raw.TotalTasks ?? undefined,
    activeTasks: raw.activeTasks ?? raw.ActiveTasks ?? undefined,
    activeProjects: raw.activeProjects ?? raw.ActiveProjects ?? undefined,
    activeEvents: raw.activeEvents ?? raw.ActiveEvents ?? undefined,
    level: pickFiniteNumber(
      raw.level,
      raw.Level,
      rawProgress.level,
      rawProgress.Level,
    ),
    shareUrl: pickString(raw.shareUrl, raw.ShareUrl),
    location: raw.location,
  };
};
