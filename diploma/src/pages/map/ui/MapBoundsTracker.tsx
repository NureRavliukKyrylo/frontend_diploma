import { useDebounce } from "@shared/libs";
import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { type MapBounds, getBounds } from "../libs/getBounds";

type Props = {
  onBoundsChange: (bounds: MapBounds) => void;
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
