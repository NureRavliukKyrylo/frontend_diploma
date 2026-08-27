import styles from "./ProjectCluster.module.scss";
import { createClusterIcon } from "@shared/libs/map";

export const ProjectClusterIcon = (count: number) =>
  createClusterIcon({ count, className: styles.clusterProjectMarker });
