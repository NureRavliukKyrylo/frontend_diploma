import { Fragment, memo, type JSX } from "react";
import useSupercluster from "use-supercluster";
import type {
  AnyProps,
  ClusterProperties,
  PointFeature,
  Options as SuperclusterOptions,
} from "supercluster";
import type { GeoJsonProperties } from "geojson";
import { useClusterAnimation, useMapViewport } from "@shared/libs/map";
import type { MapClusterProps } from "../model/MapCluster";
import { DEFAULT_CLUSTER_OPTIONS } from "../config/clusterOptions";

type AnyCluster = PointFeature<AnyProps | (ClusterProperties & AnyProps)>;

export const MapCluster = memo(
  <T extends AnyProps>({
    points,
    clusterOptions,
    selectedId,
    getEntityId,
    renderCluster,
    renderEntity,
  }: MapClusterProps<T>) => {
    const { bounds, zoom, map } = useMapViewport();

    const { clusters, supercluster } = useSupercluster({
      points: points as unknown as PointFeature<GeoJsonProperties>[],
      bounds,
      zoom,
      options: {
        ...DEFAULT_CLUSTER_OPTIONS,
        ...clusterOptions,
      } as SuperclusterOptions<GeoJsonProperties, ClusterProperties>,
    });

    const typedClusters = clusters as unknown as AnyCluster[];

    const { getFromPosition } = useClusterAnimation(
      typedClusters,
      supercluster,
    );

    return (
      <>
        {typedClusters.map((cluster) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const position: [number, number] = [lat, lng];

          if (cluster?.properties?.cluster) {
            const { point_count } = cluster.properties as ClusterProperties;
            const clusterId = `cluster-${cluster.id}`;

            return (
              <Fragment key={clusterId}>
                {renderCluster({
                  position,
                  fromPosition: getFromPosition(clusterId),
                  pointCount: point_count,
                  expand: () => {
                    const expansionZoom = Math.min(
                      supercluster!.getClusterExpansionZoom(
                        cluster.id as number,
                      ),
                      20,
                    );
                    map.flyTo(position, expansionZoom, {
                      animate: true,
                      duration: 0.8,
                    });
                  },
                })}
              </Fragment>
            );
          }

          const properties = cluster.properties as unknown as T;
          const entityId = getEntityId(properties);

          return (
            <Fragment key={entityId}>
              {renderEntity({
                properties,
                position,
                fromPosition: getFromPosition(entityId),
                isSelected: entityId === selectedId,
                markerRef: () => {},
              })}
            </Fragment>
          );
        })}
      </>
    );
  },
) as <T extends AnyProps>(props: MapClusterProps<T>) => JSX.Element;
