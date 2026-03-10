import L from "leaflet";
import styles from "./ProjectCluster.module.scss";

export const createProjectClusterIcon = (count: number) => {
  const size = count < 10 ? 40 : count < 50 ? 48 : 56;

  return L.divIcon({
    html: `<div class="${styles.clusterProjectMarker}" style="width:${size}px;height:${size}px">${count}</div>`,
    className: "",
    iconSize: L.point(size, size),
  });
};
