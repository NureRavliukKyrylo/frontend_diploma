import { memo, useRef } from "react";
import { Popup } from "react-leaflet";
import {
  ProjectClusterIcon,
  ProjectMarker,
  ProjectMarkerAnimated,
  ProjectPopupContent,
  type Project,
  type ProjectsResponse,
} from "@entities/project";
import { AnimatedMarker } from "@shared/ui";
import {
  MapCluster,
  type ClusterRenderProps,
  type EntityRenderProps,
} from "@widgets/map";
import {
  convertToClusterFeatures,
  useSelectedMarkerBounce,
} from "@shared/libs/map";
import styles from "./ProjectClusters.module.scss";

interface ProjectClustersProps {
  data?: ProjectsResponse;
  selectedId?: string | null;
}

type ProjectProperties = { item: Project };

export const ProjectClusters = memo(
  ({ data, selectedId }: ProjectClustersProps) => {
    const points = convertToClusterFeatures(data?.data ?? []);
    const getFromPositionRef = useRef<
      (id: string) => [number, number] | undefined
    >(() => undefined);

    const { registerMarker, triggerBounce } = useSelectedMarkerBounce({
      selectedId,
      getFromPosition: (id) => getFromPositionRef.current(id),
      animatedIcon: ProjectMarkerAnimated,
    });

    const renderCluster = ({
      position,
      fromPosition,
      pointCount,
      expand,
    }: ClusterRenderProps) => (
      <AnimatedMarker
        position={position}
        fromPosition={fromPosition}
        icon={ProjectClusterIcon(pointCount)}
        eventHandlers={{ click: expand }}
      />
    );

    const renderEntity = ({
      properties: { item },
      position,
      fromPosition,
      isSelected,
    }: EntityRenderProps<ProjectProperties>) => (
      <AnimatedMarker
        ref={registerMarker(item.id)}
        position={position}
        fromPosition={fromPosition}
        icon={ProjectMarker}
        onAnimationEnd={isSelected ? () => triggerBounce(item.id) : undefined}
      >
        <Popup className={styles.popupProject}>
          <ProjectPopupContent project={item} />
        </Popup>
      </AnimatedMarker>
    );

    return (
      <MapCluster<ProjectProperties>
        points={points}
        selectedId={selectedId}
        getEntityId={({ item }) => item.id}
        renderCluster={renderCluster}
        renderEntity={renderEntity}
      />
    );
  },
);
