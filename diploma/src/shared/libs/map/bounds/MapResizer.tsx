import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const MapResizer = () => {
  const map = useMap();

  useEffect(() => {
    const raf = requestAnimationFrame(() => map.invalidateSize());
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
};
