import type { OrganizationMembership } from "../model/types/OrganizationMembership";

type RawParticipationItem = {
  entityId?: string;
  EntityId?: string;
  isActive?: boolean;
  IsActive?: boolean;
  status?: string;
  Status?: string;
};

const normalizeOrganizationMembership = (
  item: RawParticipationItem,
): OrganizationMembership | null => {
  const entityId = item.entityId ?? item.EntityId;

  if (!entityId) return null;

  return {
    entityId,
    isActive: item.isActive ?? item.IsActive ?? false,
    status: item.status ?? item.Status,
  };
};

export const normalizeOrganizationMemberships = (
  payload: unknown,
): OrganizationMembership[] => {
  if (typeof payload !== "object" || payload === null) return [];

  const value = payload as {
    data?: RawParticipationItem[];
    Data?: RawParticipationItem[];
  };

  return (value.data ?? value.Data ?? [])
    .map(normalizeOrganizationMembership)
    .filter((item): item is OrganizationMembership => item !== null);
};
