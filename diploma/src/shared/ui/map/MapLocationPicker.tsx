import { Marker, Popup, useMapEvents } from "react-leaflet";
import { BaseMap } from "./BaseMap";
import { MapZoomAnimation } from "../../libs";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface MapLocationPickerProps {
  coordinates: Coordinates | null;
  defaultCoordinates: Coordinates | null;
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
  defaultCoordinates,
  zoom = 13,
  onLocationChange,
  popUpText,
}) => {
  const handleSetCoordinates = (coords: Coordinates) => {
    onLocationChange(coords);
  };

  const position: [number, number] | null = coordinates
    ? [coordinates.latitude, coordinates.longitude]
    : defaultCoordinates
    ? [defaultCoordinates.latitude, defaultCoordinates.longitude]
    : [0, 0];

  return (
    <BaseMap center={position} zoom={zoom}>
      {coordinates && (
        <Marker position={[coordinates.latitude, coordinates.longitude]}>
          <Popup>{popUpText}</Popup>
        </Marker>
      )}
      <SyncMapEvents setCoordinates={handleSetCoordinates} />
      <MapZoomAnimation coordinates={coordinates} zoom={16} />
    </BaseMap>
  );
};
