import { useMap } from "react-leaflet";
import { useState } from "react";
import styles from "./FullScreenControl.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { FullSizeIcon } from "@shared/assets/icons/actions";
import { positionStyles, type Position } from "@shared/assets/types";

interface FullScreenProps {
  position?: Position;
}

export const FullscreenControl = ({
  position = "topright",
}: FullScreenProps) => {
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = map.getContainer();
    if (!isFullscreen) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <BaseButtonWrapper
      onClick={toggle}
      type="button"
      className={styles.fullScreenButton}
      style={positionStyles[position]}
    >
      <img src={FullSizeIcon} alt="full-screen" />
    </BaseButtonWrapper>
  );
};
