import L from "leaflet";
import { forwardRef, useEffect, useRef } from "react";
import { Marker } from "react-leaflet";

interface AnimatedMarkerProps {
  position: L.LatLngExpression;
  fromPosition?: [number, number];
  icon: L.Icon | L.DivIcon;
  eventHandlers?: L.LeafletEventHandlerFnMap;
  children?: React.ReactNode;
  onAnimationEnd?: () => void;
  appearAnimation?: boolean;
}

export const AnimatedMarker = forwardRef<L.Marker, AnimatedMarkerProps>(
  (
    { position, fromPosition, icon, eventHandlers, children, onAnimationEnd },
    ref,
  ) => {
    const markerRef = useRef<L.Marker>(null);

    const setRef = (marker: L.Marker | null) => {
      (markerRef as React.RefObject<L.Marker | null>).current = marker;
      if (typeof ref === "function") ref(marker);
      else if (ref) ref.current = marker;
    };

    useEffect(() => {
      if (!markerRef.current || !fromPosition) {
        onAnimationEnd?.();
        return;
      }
      markerRef.current.setLatLng(fromPosition);

      const start = performance.now();
      const duration = 400;
      const from = L.latLng(fromPosition);
      const to = L.latLng(position);

      const animate = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const ease = t;
        markerRef.current?.setLatLng([
          from.lat + (to.lat - from.lat) * ease,
          from.lng + (to.lng - from.lng) * ease,
        ]);
        if (t < 1) {
          requestAnimationFrame(animate);
        } else {
          onAnimationEnd?.();
        }
      };

      requestAnimationFrame(animate);
    }, []);

    return (
      <Marker
        ref={setRef}
        position={position}
        icon={icon}
        eventHandlers={eventHandlers}
      >
        {children}
      </Marker>
    );
  },
);
