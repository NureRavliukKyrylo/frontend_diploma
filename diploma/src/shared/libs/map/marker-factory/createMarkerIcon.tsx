import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { FunctionComponent, SVGProps } from "react";

interface DivIconOptions {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  color?: string;
  size?: number;
  extraClass?: string;
}

export const createMarkerIcon = ({
  icon: Icon,
  color = "#000",
  size = 50,
  extraClass = "",
}: DivIconOptions) =>
  L.divIcon({
    className: "",
    html: renderToStaticMarkup(
      <Icon
        className={`markerIcon ${extraClass}`}
        style={{ color }}
        width={size}
        height={size}
      />,
    ),
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
