import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { profileQuery } from "@entities/user/profile";
import { useUserStore } from "@entities/user";
import { useGeolocation } from "@shared/libs/map";
import type { Coordinates } from "@shared/config/types";

export const useMapUserLocation = () => {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const [geoCoords, setGeoCoords] = useState<Coordinates | null>(null);

  const { data: user } = useQuery({
    ...profileQuery.all(),
    enabled: !!isAuthenticated,
  });

  const profileCoords =
    user?.profile?.coordinates?.latitude &&
    user?.profile?.coordinates?.longitude
      ? {
          latitude: user.profile.coordinates.latitude,
          longitude: user.profile.coordinates.longitude,
        }
      : null;

  useGeolocation({
    coordinates: profileCoords,
    onLocationChange: setGeoCoords,
  });

  return profileCoords ?? geoCoords ?? null;
};
