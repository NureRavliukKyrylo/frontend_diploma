import { useEffect, useRef } from "react";
import { map as baseMap } from "@shared/ui";

interface UseSelectedMarkerBounceOptions {
  selectedId: string | null | undefined;
  getFromPosition: (id: string) => [number, number] | undefined;
  animatedIcon: L.DivIcon;
}

export function useSelectedMarkerBounce({
  selectedId,
  getFromPosition,
  animatedIcon,
}: UseSelectedMarkerBounceOptions) {
  const markerRefs = useRef<Map<string, L.Marker>>(new Map());
  const hasBouncedRef = useRef<string | null>(null);

  const registerMarker = (id: string) => (marker: L.Marker | null) => {
    if (marker) markerRefs.current.set(id, marker);
    else markerRefs.current.delete(id);
  };

  const triggerBounce = (id: string) => {
    if (hasBouncedRef.current === id) return;
    const marker = markerRefs.current.get(id);
    if (!marker) return;
    hasBouncedRef.current = id;
    marker.setIcon(animatedIcon);
  };

  useEffect(() => {
    hasBouncedRef.current = null;
    if (!selectedId) return;

    const fromPos = getFromPosition(selectedId);
    if (!fromPos) {
      baseMap.onMoveEnd(() => triggerBounce(selectedId));
    }
  }, [selectedId]);

  return { registerMarker, triggerBounce };
}
