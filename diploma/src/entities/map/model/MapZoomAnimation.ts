import { useEffect } from "react";
import { useMap } from "react-leaflet";
import {
  DEFAULT_MAP_COORDINATES,
  DEFAULT_MAP_ZOOM_ANIMATION,
} from "@shared/config/constants";

interface MapZoomAnimationProps {
  coordinates: { latitude: number; longitude: number } | null;
  zoom?: number;
}
export const MapZoomAnimation: React.FC<MapZoomAnimationProps> = ({
  coordinates,
  zoom = DEFAULT_MAP_ZOOM_ANIMATION,
}) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates?.latitude != null && coordinates?.longitude != null) {
      map.flyTo([coordinates.latitude, coordinates.longitude], zoom, {
        animate: true,
        duration: 0.8,
      });
    } else {
      map.flyTo(
        [DEFAULT_MAP_COORDINATES.latitude, DEFAULT_MAP_COORDINATES.longitude],
        zoom,
        {
          animate: true,
          duration: 0.8,
        },
      );
    }
  }, [coordinates, map, zoom]);

  return null;
};
