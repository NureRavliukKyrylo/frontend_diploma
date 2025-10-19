import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapZoomAnimationProps {
  coordinates: { latitude: number; longitude: number } | null;
  zoom?: number;
}
export const MapZoomAnimation: React.FC<MapZoomAnimationProps> = ({
  coordinates,
  zoom = 13,
}) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates?.latitude && coordinates?.longitude) {
      map.flyTo([coordinates.latitude, coordinates.longitude], zoom, {
        animate: true,
        duration: 0.8,
      });
    } else {
      map.flyTo([50.4501, 30.5234], zoom, {
        animate: true,
        duration: 0.8,
      });
    }
  }, [coordinates, map]);

  return null;
};
