import { memo } from "react";
import { Popup } from "react-leaflet";
import { AnimatedMarker } from "@shared/ui";
import {
  MapCluster,
  type ClusterRenderProps,
  type EntityRenderProps,
} from "@widgets/map";
import styles from "./EventClusters.module.scss";
import { EventClusterIcon, EventMarker, type Event } from "@entities/event";
import { convertToClusterFeatures } from "@shared/libs/map";

interface EventClustersProps {
  data?: Event[];
}

type EventProperties = { item: Event };

export const EventClusters = memo(({ data }: EventClustersProps) => {
  const points = convertToClusterFeatures(data ?? []);
  const renderCluster = ({
    position,
    fromPosition,
    pointCount,
    expand,
  }: ClusterRenderProps) => (
    <AnimatedMarker
      position={position}
      fromPosition={fromPosition}
      icon={EventClusterIcon(pointCount)}
      eventHandlers={{ click: expand }}
    />
  );

  const renderEntity = ({
    properties: { item },
    position,
    fromPosition,
  }: EntityRenderProps<EventProperties>) => (
    <AnimatedMarker
      position={position}
      fromPosition={fromPosition}
      icon={EventMarker}
    >
      <Popup className={styles.popupProject}>
        <div>{item.id}</div>
      </Popup>
    </AnimatedMarker>
  );

  return (
    <MapCluster<EventProperties>
      points={points}
      getEntityId={({ item }) => item.id}
      renderCluster={renderCluster}
      renderEntity={renderEntity}
    />
  );
});
