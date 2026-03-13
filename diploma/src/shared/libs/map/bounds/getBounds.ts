import type { Map } from "leaflet";

export const getBounds = (map: Map): [number, number, number, number] => {
  const b = map.getBounds();
  return [
    b.getSouthWest().lng,
    b.getSouthWest().lat,
    b.getNorthEast().lng,
    b.getNorthEast().lat,
  ];
};
