import L from "leaflet";
import { useEffect, useRef } from "react";
import { Marker } from "react-leaflet";

interface AnimatedMarkerProps {
  position: L.LatLngExpression;
  fromPosition?: [number, number];
  icon: L.Icon | L.DivIcon;
  eventHandlers?: L.LeafletEventHandlerFnMap;
  children?: React.ReactNode;
}

export const AnimatedMarker = ({
  position,
  fromPosition,
  icon,
  eventHandlers,
  children,
}: AnimatedMarkerProps) => {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (!markerRef.current || !fromPosition) return;
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
      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={icon}
      eventHandlers={eventHandlers}
    >
      {children}
    </Marker>
  );
};
