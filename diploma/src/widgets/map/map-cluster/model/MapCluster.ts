import type {
  AnyProps,
  ClusterProperties,
  Options as SuperclusterOptions,
  PointFeature,
} from "supercluster";
import type { ReactNode } from "react";

export interface ClusterRenderProps {
  position: [number, number];
  fromPosition: [number, number] | undefined;
  pointCount: number;
  expand: () => void;
}

export interface EntityRenderProps<T> {
  properties: T;
  position: [number, number];
  fromPosition: [number, number] | undefined;
  isSelected: boolean;
  markerRef: (marker: L.Marker | null) => void;
  onAnimationEnd?: () => void;
}

export interface MapClusterProps<T extends AnyProps> {
  points: PointFeature<T>[];
  clusterOptions?: Partial<SuperclusterOptions<AnyProps, ClusterProperties>>;
  selectedId?: string | null;
  getEntityId: (properties: T) => string;
  renderCluster: (props: ClusterRenderProps) => ReactNode;
  renderEntity: (props: EntityRenderProps<T>) => ReactNode;
}
