import { useEffect } from "react";
import type { Coordinates } from "@entities/user";

export const useGeolocation = ({
  coordinates,
  onLocationChange,
}: {
  coordinates: Coordinates | null;
  onLocationChange: (coords: Coordinates) => void;
}) => {
  useEffect(() => {
    if (coordinates) return;

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
