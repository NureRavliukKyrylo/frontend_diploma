import { apiClient } from "@shared/api";
import { normalizeVolunteerSkillsResponse } from "../libs";
import type { VolunteerSkillListItemDto } from "../model/types";

export const getSkillVolunteers = async (
  skillId: string,
): Promise<VolunteerSkillListItemDto[]> => {
  const response = await apiClient.get<unknown>("/Skills/volunteers", {
    params: { skillId },
  });

  return normalizeVolunteerSkillsResponse(response.data);
};
