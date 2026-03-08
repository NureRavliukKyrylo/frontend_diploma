import { MapZoomAnimation } from "@shared/libs";
import { useRef } from "react";
import { Circle, Marker } from "react-leaflet";

interface SearchLocationLayerProps {
  coordinates: { latitude: number; longitude: number };
  radiusMeters?: number | null;
}

export const SearchLocationLayer = ({
  coordinates,
  radiusMeters,
}: SearchLocationLayerProps) => {
  const prevCoordsRef = useRef<{ latitude: number; longitude: number } | null>(
    null,
  );

  const coordsChanged =
    coordinates.latitude !== prevCoordsRef.current?.latitude ||
    coordinates.longitude !== prevCoordsRef.current?.longitude;

  if (coordsChanged) {
    prevCoordsRef.current = coordinates;
  }

  const animatedCoords = coordsChanged ? coordinates : null;

  return (
    <>
      {animatedCoords && <MapZoomAnimation coordinates={animatedCoords} />}
      <Marker position={[coordinates.latitude, coordinates.longitude]} />
      {radiusMeters != null && (
        <Circle
          center={[coordinates.latitude, coordinates.longitude]}
          radius={radiusMeters}
          pathOptions={{
            color: "#3B82F6",
            fillColor: "#3B82F6",
            fillOpacity: 0.1,
            weight: 2,
          }}
        />
      )}
    </>
  );
};
