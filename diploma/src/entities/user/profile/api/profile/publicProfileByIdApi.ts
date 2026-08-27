import { normalizeSkillListItem } from "@entities/skill";
import { apiClient, type ApiResponse } from "@shared/api";
import {
  asRecord,
  readArrayPair,
  readBooleanPair,
  readNumberPair,
  readNullableStringPair,
  readStringPair,
  readStringArrayPair,
} from "@shared/api/normalize-helpers";
import type {
  PublicBadgePreview,
  PublicUserProfileDetails,
  PublicUserProfile,
  PublicVolunteerSkill,
} from "../../model/types/public/PublicUserProfile";

const normalizePublicVolunteerSkill = (
  value: unknown,
): PublicVolunteerSkill => {
  const record = asRecord(value);
  const skill = normalizeSkillListItem(value);

  return {
    skillId: readStringPair(record, "skillId", "SkillId"),
    name: skill.name,
    description: skill.description,
    level: readStringPair(record, "level", "Level"),
    verified: readBooleanPair(record, "verified", "Verified"),
    iconUrl: skill.iconUrl,
    categories: skill.categories.map(({ id, name }) => ({ id, name })),
  };
};

const normalizePublicBadgePreview = (value: unknown): PublicBadgePreview => {
  const record = asRecord(value);

  return {
    id: readStringPair(record, "id", "Id"),
    title: readStringPair(record, "title", "Title"),
    iconUrl: readStringPair(record, "iconUrl", "IconUrl"),
    rank: readStringPair(record, "rank", "Rank"),
    description: readNullableStringPair(record, "description", "Description"),
    criteria: readStringPair(record, "criteria", "Criteria"),
  };
};

const normalizePublicProfileDetails = (
  value: unknown,
): PublicUserProfileDetails | null => {
  if (!value) {
    return null;
  }

  const record = asRecord(value);

  return {
    ...(value as PublicUserProfileDetails),
    badgeIds: readStringArrayPair(record, "badgeIds", "BadgeIds"),
    unlockedBadgesCount: readNumberPair(
      record,
      "unlockedBadgesCount",
      "UnlockedBadgesCount",
    ),
    lockedBadgesCount: readNumberPair(
      record,
      "lockedBadgesCount",
      "LockedBadgesCount",
    ),
    badgesPreview: readArrayPair(
      record,
      "badgesPreview",
      "BadgesPreview",
      normalizePublicBadgePreview,
    ),
  };
};

export const getPublicProfileById = async (
  userId: string,
): Promise<PublicUserProfile> => {
  const response = await apiClient.get<ApiResponse<unknown>>(
    `User/view/${userId}`,
  );
  const profile = response.data.data;
  const record = asRecord(profile);
  const profileDetails = record.profile ?? record.Profile;

  return {
    ...(profile as PublicUserProfile),
    profile: normalizePublicProfileDetails(profileDetails),
    skills: readArrayPair(
      record,
      "skills",
      "Skills",
      normalizePublicVolunteerSkill,
    ),
  };
};
