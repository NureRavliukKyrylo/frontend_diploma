import { useNavigate } from "@tanstack/react-router";
import { toggleArrayParam } from "@shared/libs/search-params";
import type { LocationSuggestion } from "@shared/config/types";
import type { OfferSearchParams } from "@entities/offer";

export const useOffersFilter = () => {
  const navigate = useNavigate({ from: "/time-bank/" });

  const nav = (updater: (prev: OfferSearchParams) => OfferSearchParams) =>
    navigate({
      search: (prev) => updater(prev as OfferSearchParams),
      resetScroll: false,
    });

  return {
    onStartDateChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, From: date, Page: 1 })),

    onEndBeforeChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, To: date, Page: 1 })),

    onCategoryToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        CategoryIds: toggleArrayParam(prev.CategoryIds, id),
        Page: 1,
      })),

    onSkillToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        SkillIds: toggleArrayParam(prev.SkillIds, id),
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

    onShowJoinedChange: (value: boolean) =>
      nav((prev) => ({ ...prev, ShowJoined: value, Page: 1 })),

    onShowOnlineChange: (value?: boolean) =>
      nav((prev) => ({ ...prev, IsOnline: value, Page: 1 })),

    onIncludeArchivedChange: (value: boolean) =>
      nav((prev) => ({ ...prev, IncludeArchived: value, Page: 1 })),

    onClearFilters: () => navigate({ search: (prev) => ({ tab: prev.tab }) }),
  };
};
