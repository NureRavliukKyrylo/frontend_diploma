import { useEffect } from "react";
import type { Coordinates } from "@shared/config/types";

export const useGeolocation = ({
  coordinates,
  onLocationChange,
  enabled = true,
}: {
  coordinates: Coordinates | null;
  onLocationChange: (coords: Coordinates) => void;
  enabled?: boolean;
}) => {
  useEffect(() => {
    if (!enabled || coordinates) return;

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        onLocationChange(coords);
      },
      () => {
        console.log("Location access denied or unavailable");
      },
    );
  }, []);
};
