import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapInitialBoundsProps {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

export const MapInitialBounds = ({
  minLat,
  maxLat,
  minLng,
  maxLng,
}: MapInitialBoundsProps) => {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(
      [
        [minLat, minLng],
        [maxLat, maxLng],
      ],
      { animate: false },
    );
  }, []);

  return null;
};
