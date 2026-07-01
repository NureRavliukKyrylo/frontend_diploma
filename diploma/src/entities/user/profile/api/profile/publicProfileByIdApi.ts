import { normalizeSkillListItem } from "@entities/skill";
import { apiClient, type ApiResponse } from "@shared/api";
import {
  asRecord,
  readArrayPair,
  readBooleanPair,
  readStringPair,
} from "@shared/api/normalize-helpers";
import type {
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

export const getPublicProfileById = async (
  userId: string,
): Promise<PublicUserProfile> => {
  const response = await apiClient.get<ApiResponse<unknown>>(
    `User/view/${userId}`,
  );
  const profile = response.data.data;
  const record = asRecord(profile);

  return {
    ...(profile as PublicUserProfile),
    skills: readArrayPair(
      record,
      "skills",
      "Skills",
      normalizePublicVolunteerSkill,
    ),
  };
};
