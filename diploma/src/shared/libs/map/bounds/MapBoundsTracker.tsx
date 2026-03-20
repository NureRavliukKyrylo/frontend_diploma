import { useDebounce } from "@shared/libs/hooks";
import { useEffect, useRef, useState } from "react";
import { useMapEvents } from "react-leaflet";

type Props = {
  onBoundsChange: (bounds: MapBounds) => void;
  readyRef: React.RefObject<() => void>;
};

export type MapBounds = {
  MinLat: number;
  MaxLat: number;
  MinLng: number;
  MaxLng: number;
  Zoom: number;
};

export const getBounds = (map: ReturnType<typeof useMapEvents>): MapBounds => {
  const b = map.getBounds();
  return {
    MinLat: b.getSouth(),
    MaxLat: b.getNorth(),
    MinLng: b.getWest(),
    MaxLng: b.getEast(),
    Zoom: map.getZoom(),
  };
};

export const MapBoundsTracker = ({ onBoundsChange, readyRef }: Props) => {
  const [bounds, setBounds] = useState<MapBounds | null>(null);
  const debouncedBounds = useDebounce(bounds, 300);
  const isReady = useRef(false);

  readyRef.current = () => {
    isReady.current = true;
    setBounds(getBounds(map));
  };

  const map = useMapEvents({
    moveend: () => isReady.current && setBounds(getBounds(map)),
    zoomend: () => isReady.current && setBounds(getBounds(map)),
  });

  useEffect(() => {
    if (!debouncedBounds) return;
    onBoundsChange(debouncedBounds);
  }, [debouncedBounds]);

  return null;
};
