import { MapContainer, TileLayer } from "react-leaflet";
import styles from "./BaseMap.module.scss";
import "leaflet/dist/leaflet.css";
import {
  DEFAULT_MAP_COORDINATES,
  DEFAULT_MAP_ZOOM,
  WORLD_BOUNDS,
} from "@shared/config/constants";
import { useRef } from "react";
import { SetViewOnClick } from "@shared/libs";
import { FullscreenControl } from "../full-screen/FullScreenControl";
import { ZoomControl } from "../zoom-control/ZoomControl";
import type { MapContainerProps } from "react-leaflet";
import type { Position } from "@shared/assets/types";
import { CaptureMap } from "../capture/CaptureMap";

interface BaseMapProps extends MapContainerProps {
  zoomPosition?: Position;
  fullscreenPosition?: Position;
  classNameWrapper?: string;
  fullscreenRef?: React.RefObject<HTMLDivElement | null>;
}

export const BaseMap: React.FC<BaseMapProps> = ({
  center = [
    DEFAULT_MAP_COORDINATES.latitude,
    DEFAULT_MAP_COORDINATES.longitude,
  ],
  zoom = DEFAULT_MAP_ZOOM,
  zoomPosition = "bottomright",
  fullscreenPosition = "topright",
  children,
  classNameWrapper,
  fullscreenRef,
  ...rest
}) => {
  const animateRef = useRef(true);

  return (
    <div
      className={`${styles.mapWrapper} ${classNameWrapper ? ` ${classNameWrapper}` : ""}`}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        attributionControl={false}
        zoomControl={false}
        minZoom={4}
        maxBoundsViscosity={1}
        maxBounds={WORLD_BOUNDS}
        preferCanvas={true}
        worldCopyJump={false}
        style={{
          height: "100%",
        }}
        {...rest}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          noWrap={true}
        />
        <ZoomControl position={zoomPosition} />
        <SetViewOnClick animateRef={animateRef} />
        <FullscreenControl
          fullscreenRef={fullscreenRef}
          position={fullscreenPosition}
        />
        <CaptureMap />
        {children}
      </MapContainer>
    </div>
  );
};
