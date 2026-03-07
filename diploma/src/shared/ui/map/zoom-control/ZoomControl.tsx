import { useMap } from "react-leaflet";
import styles from "./ZoomControl.module.scss";
import { MinusIcon, PlusIcon } from "@shared/assets/icons/actions";
import { positionStyles, type Position } from "@shared/assets/types";
import { useEffect, useRef } from "react";
import L from "leaflet";

interface ZoomControlProps {
  position?: Position;
}

export const ZoomControl = ({ position = "bottomright" }: ZoomControlProps) => {
  const map = useMap();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;

    L.DomEvent.disableClickPropagation(el);
  }, []);

  return (
    <div
      className={styles.zoomControl}
      style={positionStyles[position]}
      ref={containerRef}
    >
      <button
        className={styles.zoomBtn}
        type="button"
        onClick={() => map.zoomIn()}
      >
        <img src={PlusIcon} alt="zoomIn" />
      </button>
      <button
        className={styles.zoomBtn}
        type="button"
        onClick={() => map.zoomOut()}
      >
        <img src={MinusIcon} alt="zoomOut" />
      </button>
    </div>
  );
};
