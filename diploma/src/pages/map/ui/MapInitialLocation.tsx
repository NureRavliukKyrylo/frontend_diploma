import { MapZoomAnimation } from "@shared/libs";
import { useRef } from "react";
import { Marker } from "react-leaflet";
import { UserMarker } from "@entities/user/profile";
import type { Coordinates } from "@shared/config/types";

interface MapInitialLocationProps {
  coordinates: Coordinates | null;
}

export const MapInitialLocation = ({
  coordinates,
}: MapInitialLocationProps) => {
  const hasFlown = useRef(false);

  if (!coordinates) return null;

  const animatedCoords = hasFlown.current ? null : coordinates;
  hasFlown.current = true;

  return (
    <>
      {animatedCoords && <MapZoomAnimation coordinates={animatedCoords} />}
      <Marker
        position={[coordinates.latitude, coordinates.longitude]}
        icon={UserMarker}
      />
    </>
  );
};
