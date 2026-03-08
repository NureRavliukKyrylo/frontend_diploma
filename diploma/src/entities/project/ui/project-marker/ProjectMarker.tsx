import L from "leaflet";
import { ProjectMarker as ProjectMarkerIcon } from "@shared/assets/icons/markers";

export const ProjectMarker = L.divIcon({
  className: "",
  html: `<img src="${ProjectMarkerIcon}" class="projectMarkerIcon" />`,
  iconSize: [35, 35],
  iconAnchor: [20, 35],
  popupAnchor: [0, -35],
});
