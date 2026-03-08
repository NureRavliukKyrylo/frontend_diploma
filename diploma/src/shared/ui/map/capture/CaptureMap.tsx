import L from "leaflet";
import { useMap } from "react-leaflet";

let mapInstance: L.Map | null = null;

export const map = {
  flyTo: (lat: number, lng: number, zoom = 14) => {
    mapInstance?.flyTo([lat, lng], zoom, { duration: 1.2 });
  },
};

export const CaptureMap = () => {
  mapInstance = useMap();
  return null;
};
