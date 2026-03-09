import type { useMapEvents } from "react-leaflet";

export type MapBounds = {
  MinLat: number;
  MaxLat: number;
  MinLng: number;
  MaxLng: number;
};

export const getBounds = (map: ReturnType<typeof useMapEvents>): MapBounds => {
  const b = map.getBounds();
  return {
    MinLat: b.getSouth(),
    MaxLat: b.getNorth(),
    MinLng: b.getWest(),
    MaxLng: b.getEast(),
  };
};
