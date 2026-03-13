import { Marker, Popup } from "react-leaflet";
import { BaseMap } from "@shared/ui";
import { MapZoomAnimation } from "@shared/libs/map";
import { useGeolocation } from "@shared/libs/map";
import { SyncMapEvents } from "../model/setCoordinatesEvent";
import type { Icon } from "leaflet";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapLocationPickerProps {
  coordinates?: Coordinates | null;
  zoom?: number;
  onLocationChange: (coords: Coordinates) => void;
  popupContent?: React.ReactNode;
  popupClassName?: string;
  icon: Icon;
}

export const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  coordinates,
  zoom,
  onLocationChange,
  popupClassName,
  popupContent,
  icon,
}) => {
  useGeolocation({
    coordinates: coordinates ?? null,
    onLocationChange,
    enabled: !coordinates,
  });

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
          <Popup className={popupClassName}>{popupContent}</Popup>
        </Marker>
      )}
      <SyncMapEvents setCoordinates={handleSetCoordinates} />
      <MapZoomAnimation coordinates={coordinates ?? null} zoom={zoom} />
    </BaseMap>
  );
};
