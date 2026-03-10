import L from "leaflet";
import { LocationMarker as LocationMarkerIcon } from "@shared/assets/icons/markers";

export const LocationMarker = L.divIcon({
  className: "",
  html: `<img src="${LocationMarkerIcon}" class="locationMarkerIcon" />`,
  iconSize: [35, 35],
  iconAnchor: [18, 35],
  popupAnchor: [0, -35],
});
