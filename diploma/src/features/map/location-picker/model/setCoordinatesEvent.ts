import type { Coordinates } from "@shared/config/types";
import { useMapEvents } from "react-leaflet";

export const SyncMapEvents: React.FC<{
  setCoordinates: (coords: Coordinates) => void;
}> = ({ setCoordinates }) => {
  useMapEvents({
    contextmenu(e) {
      const coords: Coordinates = {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      };
      setCoordinates(coords);
    },
  });
  return null;
};
