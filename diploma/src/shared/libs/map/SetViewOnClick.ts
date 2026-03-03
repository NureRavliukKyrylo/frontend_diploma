import { useMapEvent } from "react-leaflet";

export const SetViewOnClick = ({
  animateRef,
}: {
  animateRef: React.RefObject<boolean>;
}) => {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current ?? true,
    });
  });
  return null;
};
