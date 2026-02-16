import { Marker, Popup, useMapEvents } from "react-leaflet";
import { BaseMap } from "./BaseMap";
import { MapZoomAnimation } from "../model/MapZoomAnimation";
import { useGeolocation } from "../model/useGeoLocation";

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
        <Marker position={[coordinates.latitude, coordinates.longitude]}>
          <Popup>{popUpText}</Popup>
        </Marker>
      )}
      <SyncMapEvents setCoordinates={handleSetCoordinates} />
      <MapZoomAnimation coordinates={coordinates} zoom={zoom} />
    </BaseMap>
  );
};
