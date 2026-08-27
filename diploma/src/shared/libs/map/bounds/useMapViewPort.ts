import { useEffect, useState } from "react";
import { getBounds } from "./getBounds";
import { useMap } from "react-leaflet";

export const useMapViewport = () => {
  const map = useMap();
  const [bounds, setBounds] = useState<[number, number, number, number]>();
  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const update = () => {
      setBounds(getBounds(map));
      setZoom(map.getZoom());
    };
    update();
    map.on("moveend zoomend", update);
    return () => {
      map.off("moveend zoomend", update);
    };
  }, [map]);

  return { bounds, zoom, map };
};
