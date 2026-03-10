import { useRef } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMapInitialLocation } from "./useMapInitialLocation.ts";
import type { MapBounds } from "@shared/libs/index.ts";

export const useMapPage = () => {
  const navigate = useNavigate({ from: "/map/" });
  const search = useSearch({ from: "/_noFooterLayout/map/" });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { Page, pageSize, ...mapSearch } = search;
  const {
    Lat,
    Lng,
    Location,
    RadiusKm,
    MinLat,
    MaxLat,
    MinLng,
    MaxLng,
    ...listParams
  } = search;

  const searchCoordinates =
    search.Lat != null && search.Lng != null
      ? { latitude: search.Lat, longitude: search.Lng }
      : null;

  const radiusMeters = search.RadiusKm != null ? search.RadiusKm * 1000 : null;

  const initialLocation = useMapInitialLocation();

  const handleSearch = (value: string) => {
    navigate({
      search: (prev) => ({ ...prev, Search: value || undefined }),
      resetScroll: false,
    });
  };

  const handleSearchBounds = (bounds: MapBounds) => {
    navigate({
      search: (prev) => ({ ...prev, ...bounds }),
      replace: true,
      resetScroll: false,
    });
  };

  return {
    search,
    wrapperRef,
    mapSearch,
    listParams,
    searchCoordinates,
    radiusMeters,
    initialLocation,
    handleSearch,
    handleSearchBounds,
  };
};
