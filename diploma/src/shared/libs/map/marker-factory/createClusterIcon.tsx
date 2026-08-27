import L from "leaflet";

interface ClusterIconOptions {
  count: number;
  className: string;
  thresholds?: [number, number];
  sizes?: [number, number, number];
}

export const createClusterIcon = ({
  count,
  className,
  thresholds = [10, 50],
  sizes = [40, 48, 56],
}: ClusterIconOptions) => {
  const size =
    count < thresholds[0]
      ? sizes[0]
      : count < thresholds[1]
        ? sizes[1]
        : sizes[2];

  return L.divIcon({
    html: `<div class="${className}" style="width:${size}px;height:${size}px">${count}</div>`,
    className: "",
    iconSize: L.point(size, size),
  });
};
