import { memo } from "react";
import { Marker, Popup } from "react-leaflet";
import {
  createProjectClusterIcon,
  ProjectMarker,
  ProjectPopupContent,
  toGeoPoints,
  type Project,
  type ProjectsResponse,
} from "@entities/project";
import styles from "./MapProjectCluster.module.scss";
import useSupercluster from "use-supercluster";
import type { ClusterProperties } from "supercluster";
import { useMapViewport } from "@shared/libs/map";

interface MapProjectClusterProps {
  data?: ProjectsResponse;
}

export const MapProjectCluster = memo(({ data }: MapProjectClusterProps) => {
  const { bounds, zoom, map } = useMapViewport();

  const points = toGeoPoints(data?.data ?? []);
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 200, maxZoom: 20 },
  });

  return (
    <>
      {clusters.map((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;
        const { point_count } = cluster.properties as ClusterProperties;

        if (cluster.properties.cluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[lat, lng]}
              icon={createProjectClusterIcon(point_count)}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster!.getClusterExpansionZoom(cluster.id as number),
                    20,
                  );
                  map.setView([lat, lng], expansionZoom, { animate: true });
                },
              }}
            />
          );
        }
        const { project } = cluster.properties as { project: Project };

        return (
          <Marker key={project.id} position={[lat, lng]} icon={ProjectMarker}>
            <Popup className={styles.popupProject}>
              <ProjectPopupContent project={project} />
            </Popup>
          </Marker>
        );
      })}
    </>
  );
});
