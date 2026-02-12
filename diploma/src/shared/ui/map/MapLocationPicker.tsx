import { Marker, Popup, useMapEvents } from "react-leaflet";
import { BaseMap } from "./BaseMap";
import { MapZoomAnimation } from "@shared/libs";
import { DEFAULT_MAP_COORDINATES } from "@shared/config/constants/map";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapLocationPickerProps {
  coordinates: Coordinates | null;
  zoom?: number;
  onLocationChange: (coords: Coordinates) => void;
  popUpText: string;
}

const SyncMapEvents: React.FC<{
  setCoordinates: (coords: Coordinates) => void;
}> = ({ setCoordinates }) => {
  useMapEvents({
    contextmenu(e) {
      const coords: Coordinates = {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
      };
      setCoordinates(coords);
    },
  });
  return null;
};

export const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  coordinates,
  zoom,
  onLocationChange,
  popUpText,
}) => {
  const handleSetCoordinates = (coords: Coordinates) => {
    onLocationChange(coords);
  };

  const position: [number, number] = [
    DEFAULT_MAP_COORDINATES.latitude,
    DEFAULT_MAP_COORDINATES.longitude,
  ];

  return (
    <BaseMap center={position} zoom={zoom}>
      {coordinates && (
        <Marker position={[coordinates.latitude, coordinates.longitude]}>
          <Popup>{popUpText}</Popup>
        </Marker>
      )}
      <SyncMapEvents setCoordinates={handleSetCoordinates} />
      <MapZoomAnimation coordinates={coordinates} zoom={zoom} />
    </BaseMap>
  );
};
