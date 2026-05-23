import styles from "./EventCluster.module.scss";
import { createClusterIcon } from "@shared/libs/map";

export const EventClusterIcon = (count: number) =>
  createClusterIcon({ count, className: styles.clusterEventMarker });
