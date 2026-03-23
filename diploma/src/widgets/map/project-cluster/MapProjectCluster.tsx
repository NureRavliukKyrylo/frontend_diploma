import { memo, useEffect, useRef } from "react";
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
import { AnimatedMarker, map as baseMap } from "@shared/ui";

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

    const markerRefs = useRef<Map<string, L.Marker>>(new Map());
    const hasBouncedRef = useRef<string | null>(null);

    const triggerBounce = (id: string) => {
      if (hasBouncedRef.current === id) return;
      const marker = markerRefs.current.get(id);
      if (!marker) return;
      hasBouncedRef.current = id;
      marker.setIcon(ProjectMarkerAnimated);
    };

    useEffect(() => {
      hasBouncedRef.current = null;
      if (!selectedId) return;

      const fromPos = getFromPosition(selectedId);
      if (!fromPos) {
        baseMap.onMoveEnd(() => triggerBounce(selectedId));
      }
    }, [selectedId]);

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
          const isSelected = project.id === selectedId;

          return (
            <AnimatedMarker
              ref={(marker) => {
                if (marker) markerRefs.current.set(project.id, marker);
                else markerRefs.current.delete(project.id);
              }}
              key={project.id}
              position={[lat, lng]}
              fromPosition={getFromPosition(project.id)}
              icon={ProjectMarker}
              onAnimationEnd={
                isSelected ? () => triggerBounce(project.id) : undefined
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
