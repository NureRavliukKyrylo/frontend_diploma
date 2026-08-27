import { useNavigate } from "@tanstack/react-router";
import type { LocationSuggestion } from "@shared/config/types";
import type { OrganizationSearchParams } from "@entities/organization";

export const useOrganizationFilters = () => {
  const navigate = useNavigate({ from: "/organizations/" });

  const nav = (
    updater: (prev: OrganizationSearchParams) => OrganizationSearchParams,
  ) => navigate({ search: updater, resetScroll: false });

  return {
    onRatingChange: (rating: number | undefined) =>
      nav((prev) => ({ ...prev, RatingFrom: rating, Page: 1 })),

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

    onIncludeArchived: (value: boolean) =>
      nav((prev) => ({ ...prev, IncludeArchived: value, Page: 1 })),

    onShowJoinedChange: (value: boolean) =>
      nav((prev) => ({ ...prev, ShowJoined: value, Page: 1 })),

    onClearFilters: () => navigate({ search: {} }),
  };
};
