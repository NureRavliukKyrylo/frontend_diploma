import { memo } from "react";
import { Popup } from "react-leaflet";
import {
  createProjectClusterIcon,
  ProjectMarker,
  ProjectMarkerAnimated,
  ProjectPopupContent,
  toGeoPoints,
  type Project,
  type ProjectsResponse,
} from "@entities/project";
import styles from "./MapProjectCluster.module.scss";
import useSupercluster from "use-supercluster";
import type { ClusterProperties } from "supercluster";
import { useClusterAnimation, useMapViewport } from "@shared/libs/map";
import { AnimatedMarker } from "@shared/ui";

interface MapProjectClusterProps {
  data?: ProjectsResponse;
  selectedId?: string | null;
}

export const MapProjectCluster = memo(
  ({ data, selectedId }: MapProjectClusterProps) => {
    const { bounds, zoom, map } = useMapViewport();
    const points = toGeoPoints(data?.data ?? []);
    const { clusters, supercluster } = useSupercluster({
      points,
      bounds,
      zoom,
      options: {
        radius: 130,
        maxZoom: 18,
        minZoom: 0,
        extent: 512,
        nodeSize: 64,
      },
    });
    const { getFromPosition } = useClusterAnimation(clusters, supercluster);

    return (
      <>
        {clusters.map((cluster) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const { point_count } = cluster.properties as ClusterProperties;

          if (cluster.properties.cluster) {
            return (
              <AnimatedMarker
                key={`cluster-${cluster.id}`}
                position={[lat, lng]}
                fromPosition={getFromPosition(`cluster-${cluster.id}`)}
                icon={createProjectClusterIcon(point_count)}
                eventHandlers={{
                  click: () => {
                    const expansionZoom = Math.min(
                      supercluster!.getClusterExpansionZoom(
                        cluster.id as number,
                      ),
                      20,
                    );
                    map.flyTo([lat, lng], expansionZoom, {
                      animate: true,
                      duration: 0.8,
                    });
                  },
                }}
              />
            );
          }
          const { project } = cluster.properties as { project: Project };

          return (
            <AnimatedMarker
              key={project.id}
              position={[lat, lng]}
              fromPosition={getFromPosition(project.id)}
              icon={
                project.id === selectedId
                  ? ProjectMarkerAnimated
                  : ProjectMarker
              }
            >
              <Popup className={styles.popupProject}>
                <ProjectPopupContent project={project} />
              </Popup>
            </AnimatedMarker>
          );
        })}
      </>
    );
  },
);
