import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import type { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapZoomAnimation } from "../../../shared/libs";
import { useState } from "react";
import styles from "./MapLocationPicker.module.scss";

const SyncMapEvents: React.FC<{
  setCoordinates: (coords: { lat: number; lng: number }) => void;
}> = ({ setCoordinates }) => {
  useMapEvents({
    contextmenu(e) {
      const latlng: LatLng = e.latlng;
      setCoordinates({ lat: latlng.lat, lng: latlng.lng });
    },
  });

  return null;
};

export const MapLocationPicker: React.FC = () => {
  const defaultPosition: [number, number] = [50.4501, 30.5234];
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const position: [number, number] =
    coordinates?.lat != null && coordinates?.lng != null
      ? [coordinates.lat, coordinates.lng]
      : defaultPosition;

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={position}
        zoom={13}
        zoomControl={false}
        style={{
          height: "100%",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {coordinates?.lat != null && coordinates?.lng != null && (
          <Marker position={[coordinates.lat, coordinates.lng]}>
            <Popup className={styles.customPopup}>
              <div className={styles.blockUserLocation}>
                <h1>Your Location</h1>
              </div>
            </Popup>
          </Marker>
        )}

        <SyncMapEvents setCoordinates={setCoordinates} />
        <MapZoomAnimation coordinates={coordinates} zoom={16} />
      </MapContainer>
    </div>
  );
};
