import { useMapEvent } from "react-leaflet";

export const SetViewOnClick = ({
  animateRef,
}: {
  animateRef: React.RefObject<boolean>;
}) => {
  const map = useMapEvent("click", (e) => {
    const target = e.originalEvent.target as HTMLElement;

    if (
      target.closest("button") ||
      target.closest("input") ||
      target.closest("[data-no-map-click]")
    )
      return;

    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current ?? true,
    });
  });

  return null;
};
