import { MarkerIcon } from "@shared/assets/icons/markers";
import { createMarkerIcon } from "@shared/libs/map";

export const ProjectMarker = createMarkerIcon({
  icon: MarkerIcon,
  color: "#8C0000",
});

export const ProjectMarkerAnimated = createMarkerIcon({
  icon: MarkerIcon,
  color: "#8C0000",
  extraClass: "marker-bounce",
});
