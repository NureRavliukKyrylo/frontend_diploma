import { useNavigate } from "@tanstack/react-router";
import { toggleArrayParam } from "@shared/libs/search-params";
import type { LocationSuggestion } from "@shared/config/types";
import type { ProjectSearchParams } from "@entities/project";

export const useMapFilters = () => {
  const navigate = useNavigate({ from: "/map/" });

  const nav = (updater: (prev: ProjectSearchParams) => ProjectSearchParams) =>
    navigate({ search: updater, resetScroll: false });

  return {
    onStartDateChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, StartDate: date, Page: 1 })),

    onEndBeforeChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, EndBefore: date, Page: 1 })),

    onRatingChange: (rating: number | undefined) =>
      nav((prev) => ({ ...prev, Rating: rating, Page: 1 })),

    onCategoryToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        CategoryIds: toggleArrayParam(prev.CategoryIds, id),
        Page: 1,
      })),

    onOrganizationToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        OrganizationIds: toggleArrayParam(prev.OrganizationIds, id),
        Page: 1,
      })),

    onLocationSelect: (location: LocationSuggestion, radiusKm: number) =>
      nav((prev) => ({
        ...prev,
        Lat: location.lat,
        Lng: location.lng,
        Location: location.displayName,
        RadiusKm: radiusKm,
        Page: 1,
      })),

    onLocationClear: () =>
      nav((prev) => ({
        ...prev,
        Lat: undefined,
        Lng: undefined,
        Location: undefined,
        RadiusKm: undefined,
      })),

    onRadiusChange: (radiusKm: number) =>
      nav((prev) => ({ ...prev, RadiusKm: radiusKm, Page: 1 })),

    onOnlyActiveChange: (value: boolean) =>
      nav((prev) => ({ ...prev, OnlyActive: value, Page: 1 })),

    onShowJoinedChange: (value: boolean) =>
      nav((prev) => ({ ...prev, ShowJoined: value, Page: 1 })),

    onClearFilters: () => navigate({ search: {} }),
  };
};
