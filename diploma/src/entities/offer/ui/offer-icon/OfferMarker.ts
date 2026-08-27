import L from "leaflet";
import { OfferIcon } from "@shared/assets/icons/markers";

export const OfferMarker = L.icon({
  iconUrl: OfferIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
