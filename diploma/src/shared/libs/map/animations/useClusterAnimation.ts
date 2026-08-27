import { useEffect, useRef } from "react";
import type { AnyProps, ClusterProperties, PointFeature } from "supercluster";
import type Supercluster from "supercluster";
import type { GeoJsonProperties } from "geojson";

type AnyCluster = PointFeature<(ClusterProperties & AnyProps) | AnyProps> & {
  id?: number | string;
};

type AnySupercluster = Supercluster<GeoJsonProperties, ClusterProperties>;

function getNodeKey(cluster: AnyCluster): string {
  if (!cluster.properties.cluster) {
    return String(
      (cluster.properties as { project?: { id: string } }).project?.id ??
        cluster.id,
    );
  }
  return `cluster-${cluster.id}`;
}

export function useClusterAnimation(
  clusters: AnyCluster[],
  supercluster: AnySupercluster | undefined,
) {
  const nodeToClusterPos = useRef<Map<string, [number, number]>>(new Map());
  const fromPositions = new Map<string, [number, number]>();

  for (const cluster of clusters) {
    const key = getNodeKey(cluster);
    const pos = nodeToClusterPos.current.get(key);
    if (pos) fromPositions.set(key, pos);
  }

  useEffect(() => {
    if (!supercluster) return;

    const next = new Map<string, [number, number]>();

    for (const cluster of clusters) {
      if (!cluster.properties.cluster) continue;

      const [lng, lat] = cluster.geometry.coordinates;
      const clusterPos: [number, number] = [lat, lng];

      try {
        const leaves = supercluster.getLeaves(cluster.id as number, Infinity);
        for (const leaf of leaves) {
          next.set(getNodeKey(leaf as AnyCluster), clusterPos);
        }

        const children = supercluster.getChildren(cluster.id as number);
        for (const child of children) {
          if ((child.properties as ClusterProperties).cluster) {
            next.set(getNodeKey(child as AnyCluster), clusterPos);
          }
        }
      } catch {}
    }

    nodeToClusterPos.current = next;
  }, [clusters, supercluster]);

  return {
    getFromPosition: (key: string): [number, number] | undefined =>
      fromPositions.get(key),
  };
}
