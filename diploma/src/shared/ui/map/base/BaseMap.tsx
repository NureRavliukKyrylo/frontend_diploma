import { MapContainer, TileLayer } from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import styles from "./BaseMap.module.scss";
import "leaflet/dist/leaflet.css";
import {
  DEFAULT_MAP_COORDINATES,
  DEFAULT_MAP_ZOOM,
} from "@shared/config/constants";

export const BaseMap: React.FC<{
  center?: LatLngExpression;
  zoom?: number;
  children?: React.ReactNode;
}> = ({
  center = [
    DEFAULT_MAP_COORDINATES.latitude,
    DEFAULT_MAP_COORDINATES.longitude,
  ],
  zoom = DEFAULT_MAP_ZOOM,
  children,
}) => {
  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{
          height: "100%",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {children}
      </MapContainer>
    </div>
  );
};
