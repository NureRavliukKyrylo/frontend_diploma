import { useDebounce } from "@shared/libs";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";

type Props = {
  onBoundsChange: (bounds: MapBounds) => void;
};

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
export const MapBoundsTracker = ({ onBoundsChange }: Props) => {
  const [bounds, setBounds] = useState<MapBounds | null>(null);
  const debouncedBounds = useDebounce(bounds, 300);

  const map = useMapEvents({
    moveend: () => setBounds(getBounds(map)),
    zoomend: () => setBounds(getBounds(map)),
  });

  useEffect(() => {
    setBounds(getBounds(map));
  }, []);

  useEffect(() => {
    if (!debouncedBounds) return;
    onBoundsChange(debouncedBounds);
  }, [debouncedBounds]);

  return null;
};
