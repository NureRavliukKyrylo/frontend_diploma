import type { Coordinates } from "../types";
import { type LatLngBoundsExpression } from "leaflet";

export const DEFAULT_MAP_COORDINATES: Coordinates = {
  latitude: 50.4501,
  longitude: 30.5234,
};

export const DEFAULT_MAP_ZOOM = 1;
export const DEFAULT_MAP_ZOOM_ANIMATION = 12;

export const WORLD_BOUNDS: LatLngBoundsExpression = [
  [-90, -180],
  [90, 180],
];
