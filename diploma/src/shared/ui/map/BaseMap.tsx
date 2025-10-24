import { MapContainer, TileLayer } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import styles from "./BaseMap.module.scss";
import "leaflet/dist/leaflet.css";

export const BaseMap: React.FC<{
  center?: LatLngExpression;
  zoom?: number;
  children?: React.ReactNode;
}> = ({ center = [50.4501, 30.5234], zoom = 13, children }) => {
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
