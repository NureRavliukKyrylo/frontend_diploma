import L from "leaflet";
import { UserMarker as UserIcon } from "@shared/assets/icons/markers";

export const UserMarker = L.icon({
  iconUrl: UserIcon,
  iconSize: [52, 52],
  iconAnchor: [26, 52],
  popupAnchor: [0, -52],
});
