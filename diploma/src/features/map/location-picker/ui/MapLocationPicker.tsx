import { Marker, Popup } from "react-leaflet";
import { BaseMap } from "@shared/ui";
import { MapZoomAnimation } from "@shared/libs/map/MapZoomAnimation";
import { useGeolocation } from "@shared/libs/map/useGeoLocation";
import { SyncMapEvents } from "../model/setCoordinatesEvent";
import type { Icon } from "leaflet";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapLocationPickerProps {
  coordinates: Coordinates | null;
  zoom?: number;
  onLocationChange: (coords: Coordinates) => void;
  popUpText: string;
  icon: Icon;
}

export const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  coordinates,
  zoom,
  onLocationChange,
  popUpText,
  icon,
}) => {
  useGeolocation({ coordinates, onLocationChange });

  const handleSetCoordinates = (coords: Coordinates) => {
    onLocationChange(coords);
  };

  return (
    <BaseMap
      center={
        coordinates ? [coordinates.latitude, coordinates.longitude] : undefined
      }
    >
      {coordinates && (
        <Marker
          position={[coordinates.latitude, coordinates.longitude]}
          icon={icon}
        >
          <Popup>{popUpText}</Popup>
        </Marker>
      )}
      <SyncMapEvents setCoordinates={handleSetCoordinates} />
      <MapZoomAnimation coordinates={coordinates} zoom={zoom} />
    </BaseMap>
  );
};
