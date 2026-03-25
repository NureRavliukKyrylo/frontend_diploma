import type { Coordinates } from "@shared/config/types";
import { useEffect, useRef, useState } from "react";

export const useMapZoomOnce = (
  coordinates: Coordinates | null,
  animate: boolean,
) => {
  const hasFlown = useRef(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!coordinates || !animate || hasFlown.current) return;
    hasFlown.current = true;
    setShouldAnimate(true);
  }, [coordinates]);

  return { shouldAnimate, stopAnimation: () => setShouldAnimate(false) };
};
