import { memo } from "react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "@tanstack/react-router";
import {
  createProjectClusterIcon,
  ProjectMarker,
  projectQuery,
  toGeoPoints,
  type Project,
} from "@entities/project";
import { DefaultAvatar } from "@shared/assets/images/user";
import { type MapProjectSearchParams } from "@entities/project";
import styles from "./MapProjectCluster.module.scss";
import useSupercluster from "use-supercluster";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ClusterProperties } from "supercluster";
import { useMapViewport } from "@shared/libs";

interface MapProjectClusterProps {
  search: MapProjectSearchParams;
}

export const MapProjectCluster = memo(({ search }: MapProjectClusterProps) => {
  const { bounds, zoom, map } = useMapViewport();
  const { data } = useSuspenseQuery(projectQuery.map(search));

  const points = toGeoPoints(data.data ?? []);
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
              <div className={styles.popupProjectContent}>
                <div className={styles.projectInfo}>
                  <h1>{project.title}</h1>
                  <p>{project.description}</p>
                  <Link
                    to="/projects/$id"
                    params={{ id: project.id }}
                    className={styles.seeMoreButtonProject}
                  >
                    see more
                  </Link>
                </div>
                <div className={styles.organizationProjectInfo}>
                  <div className={styles.organizationImage}>
                    <img
                      src={project.organization?.logoUrl ?? DefaultAvatar}
                      alt="organization"
                    />
                    <h1>{project.organization?.name}</h1>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
});
