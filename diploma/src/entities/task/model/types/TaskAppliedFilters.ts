export interface TaskAppliedFilters {
  search: string | null;
  categoryIds: string[] | null;
  organizationIds: string[] | null;
  ownerId: string | null;
  states: string[] | null;
  radiusKm: number | null;
  minLat: number | null;
  maxLat: number | null;
  minLng: number | null;
  maxLng: number | null;
  onlyActive: boolean;
  showJoined: boolean;
  includeArchived: boolean;
  endBefore: string | null;
  startDate: string | null;
}
