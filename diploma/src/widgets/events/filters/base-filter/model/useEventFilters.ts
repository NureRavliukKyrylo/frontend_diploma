import { useNavigate } from "@tanstack/react-router";
import { toggleArrayParam } from "@shared/libs/search-params";
import type { LocationSuggestion } from "@shared/config/types";
import { eventsTabDefaults, type EventSearchParams } from "@entities/event";

export const useEventFilters = () => {
  const navigate = useNavigate({ from: "/events/" });

  const nav = (updater: (prev: EventSearchParams) => EventSearchParams) =>
    navigate({ search: updater, resetScroll: false });

  return {
    onStartDateChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, From: date, Page: 1 })),

    onEndBeforeChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, To: date, Page: 1 })),

    onRatingChange: (rating: number | undefined) =>
      nav((prev) => ({ ...prev, Rating: rating, Page: 1 })),

    onProjectToggle: (id: string) =>
      nav((prev) => ({
        ...prev,
        ProjectIds: toggleArrayParam(prev.ProjectIds, id),
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
      nav((prev) => ({ ...prev, IncludeArchived: value, Page: 1 })),

    onShowJoinedChange: (value: boolean) =>
      nav((prev) => ({ ...prev, ShowJoined: value, Page: 1 })),

    onIncludeSeries: (value: boolean) =>
      nav((prev) => ({ ...prev, IncludeSeriesMasters: value, Page: 1 })),

    onClearFilters: () => navigate({ search: eventsTabDefaults }),
  };
};
