import L from "leaflet";
import { ProjectMarker as ProjectMarkerIcon } from "@shared/assets/icons/markers";

export const ProjectMarker = L.icon({
  iconUrl: ProjectMarkerIcon,
  iconSize: [35, 35],
  iconAnchor: [23, 35],
  popupAnchor: [0, -35],
});
