import { useRef } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { MapBounds } from "@shared/libs/map";
import { useMapUserLocation } from "@features/map";

export const useMapPage = () => {
  const navigate = useNavigate({ from: "/map/" });
  const search = useSearch({ from: "/_noFooterLayout/map/" });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { Page, PageSize, Zoom, ...mapSearch } = search;
  const {
    Lat,
    Lng,
    Location,
    RadiusKm,
    MinLat,
    MaxLat,
    MinLng,
    MaxLng,
    Zoom: zoomList,
    ...listParams
  } = search;

  const searchCoordinates =
    search.Lat != null && search.Lng != null
      ? { latitude: search.Lat, longitude: search.Lng }
      : null;
  const hasBounds =
    search.MinLat != null &&
    search.MaxLat != null &&
    search.MinLng != null &&
    search.MaxLng != null;

  const radiusMeters = search.RadiusKm != null ? search.RadiusKm * 1000 : null;

  const { coordinates: userLocation, isReady: locationReady } =
    useMapUserLocation();

  const initialCoords = !hasBounds ? (searchCoordinates ?? userLocation) : null;

  const initialZoom = search.Zoom ?? (searchCoordinates ? 12 : 5);

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
    radiusMeters,
    searchCoordinates,
    hasBounds,
    initialCoords,
    initialZoom,
    handleSearch,
    handleSearchBounds,
    userLocation,
    locationReady,
  };
};
