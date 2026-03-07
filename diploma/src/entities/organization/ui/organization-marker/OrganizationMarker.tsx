import L from "leaflet";
import { OrganizationMarker as OrganizationMarkerIcon } from "@shared/assets/icons/markers";

export const OrganizationMarker = L.icon({
  iconUrl: OrganizationMarkerIcon,
  iconSize: [35, 35],
  iconAnchor: [23, 35],
  popupAnchor: [0, -35],
});
